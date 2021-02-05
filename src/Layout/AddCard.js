import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";
import CardForm from "./CardForm"


function AddCard() {
  const { deckId } = useParams();
 

  const [deck, SetDeck] = useState({});

  useEffect(() => {
    async function loadDeck() {
      const getDeck = await readDeck(deckId);

      SetDeck(getDeck);
    }
    loadDeck();
  }, [deckId]);

  const initialFormState = {
    front: "",
    back: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    const value = target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createCard(deckId, formData).then(() => {
      setFormData({ ...initialFormState });
    });
  };

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
          <p className="mb-0 text-secondary"> Add Card</p>
        </div>
      </div>
      <div className="row ml-0">
        <h3>{deck.name}: Add Card</h3>
      </div>
      
          <CardForm deckId={deckId} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} type="add"/>

    
    </div>
  );
}

export default AddCard;
