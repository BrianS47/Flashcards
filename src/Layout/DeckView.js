import React, { useState, useEffect } from "react";
import { useParams, Link,useHistory,useRouteMatch } from "react-router-dom";
import CardList from "./CardList";
import { readDeck, listCards,deleteDeck } from "../utils/api/index";

function DeckView() {
  const { deckId } = useParams();
  const history = useHistory()
  const {url} = useRouteMatch()
  const [deck, SetDeck] = useState({});
  const [cards, setCards] = useState([]);
  useEffect(() => {
    async function loadDeck() {
      const getDeck = await readDeck(deckId);
      const getCards = await listCards(deckId);
      SetDeck(getDeck);
      setCards(getCards);
    }
    loadDeck();
  }, [deckId]);

  function deleteDeckHandler() {
    if (window.confirm("Delete this Deck?")) {
      deleteDeck(deckId)
      .then(()=> {
          history.push("/")
      })
    }
  }

  

   if(Object.keys(deck).length) {
  return (
    <div>
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

            {<p className="mr-2 ml-2 mb-0 text-secondary">{deck.name} </p>}
          </div>
        </div>
        <div className="row">
            <h5>{deck.name}</h5>
            
        </div>
        <div className="row">
            <p className="w-50">{deck.description}</p>
        </div>
        <div className="row mb-3">
            <button className="btn btn-secondary mr-3" onClick={()=> history.push(`${url}/edit`)}>
                <span className="oi oi-pencil mr-2"/>Edit</button>
            <button className="btn btn-primary mr-3"
            onClick={()=> history.push(`${url}/study`)}>
                <span className="oi oi-book mr-2"/>Study</button>
            <button className="btn btn-primary mr-3"
            onClick={()=> history.push(`${url}/cards/new`)}>
                <span className="oi oi-plus mr-2"/>Add Cards</button>
            <button className="btn btn-danger" 
            style={{marginLeft:"200px"}}
            onClick={deleteDeckHandler}> 
            <span className="oi oi-trash px-1"/></button>
        </div>
        <div>
            <CardList cards={cards}/>
        </div>
      </div>
    </div>
  );
          }
          return "..loading"
}

export default DeckView;
