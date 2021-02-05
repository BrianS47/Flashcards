import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import CardForm from "./CardForm"

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  const [deck, SetDeck] = useState({});
  const [card, setCard] = useState({});
  const [formData, setFormData] = useState({});
  useEffect(() => {
    async function loadDeck() {
      const getDeck = await readDeck(deckId);
      const getCard = await readCard(cardId);
      SetDeck(getDeck);
      setCard(getCard);
    }
    loadDeck();
  }, [cardId, deckId]);

  useEffect(() => {
    setFormData({
      id: cardId,
      front: card.front,
      back: card.back,
      deckId: deckId,
    });
  }, [card, cardId, deckId]);

  const handleChange = ({ target }) => {
    const value = target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCard(formData).then(() => history.push(`/decks/${deckId}`));
  };

  if (card.front) {
    return (
      <div className="container">
        <div className="row">
          <div className="alert alert-dark d-flex flex-row justify-content-start w-75">
            {
              <Link to="/">
                <p className="mr-2  ml-2 mb-0">
                  <span className="oi oi-home mr-1" />
                  Home{" "}
                </p>{" "}
              </Link>
            }
            <p className="mr-2 mb-0">/</p>

            {
              <Link to={`/decks/${deckId}`}>
                <p className="mr-2 ml-2 mb-0">{deck.name} </p>
              </Link>
            }
            <span className="mb-0 mr-2">/</span>
            <p className="mb-0 text-secondary"> Edit Card {card.id}</p>
          </div>
        </div>
        <div className="row ml-0">
          <h3>{deck.name}: Edit Card</h3>
        </div>

        
          <CardForm deckId={deckId} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} type="edit"/>
        
      </div>
    );
  }
  return "..loading";
}

export default EditCard;
