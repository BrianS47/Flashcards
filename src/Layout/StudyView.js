import React, { useEffect, useState } from "react";
import { useParams, Link,useHistory } from "react-router-dom";
import { readDeck, listCards } from "../utils/api/index";

function StudyView() {
  const { deckId } = useParams();
  const history = useHistory()

  const [deck, SetDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [cardCounter, setCardCounter] = useState(1);
  const [hasFlipped, setHasFlipped] = useState(false);
  useEffect(() => {
    async function loadDeck() {
      const getDeck = await readDeck(deckId);
      const getCards = await listCards(deckId);
      SetDeck(getDeck);
      
      setCards(getCards ? getCards : []);
    }
    loadDeck();
  }, [deckId]);

  function flipClick() {
    setHasFlipped((prevState) => !prevState);
  }

  function nextClick() {
    setHasFlipped((prevState) => !prevState);
    setCurrentCard((currentValue) => currentValue + 1);
    setCardCounter((currentValue) => currentValue + 1);
  }

  function restartClick() {
      if(cards.length >= 3 && cardCounter > 1){
    if (window.confirm("restart the cards?")) {
      setCurrentCard(0);
      setCardCounter(1);
      setHasFlipped(false);
    }
}
  }

  if (Object.keys(deck).length !== 0) {
    return (
      <div className="pl-0">
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
              <p className="mb-0 text-secondary"> Study</p>
            </div>
            
            
          </div>
          <div className="row">
          <h2>{deck.name}: Study</h2>
          </div>
        </div>
        { cards && cards.length >= 3  ?
        <div className="container pl-0 mt-3 ">
          <div className="border pl-5 " style={{ width: "60%" }}>
            <div className="row">
              <h6 className="  pt-2 ">
                {" "}
                Card {currentCard + 1} of {cards.length}
              </h6>
            </div>
            {hasFlipped ? (
              <div className="row ">
                <p>{cards[currentCard].back}</p>
              </div>
            ) : (
              <div className="row ">
                <p>{cards[currentCard].front}</p>
              </div>
            )}
            <div className="row pb-3">
              <button className=" btn btn-secondary mr-2" onClick={flipClick}>
                Flip
              </button>
              {hasFlipped && cardCounter !== cards.length ? (
                <button className=" btn  btn-primary" onClick={nextClick}>
                  {" "}
                  Next
                </button>
              ) : null}
              {hasFlipped && cardCounter === cards.length ? (
                <button className=" btn  btn-primary" onClick={restartClick}>
                  {" "}
                  Next
                </button>
              ) : null}
            </div>
          </div>
        </div> :  
        <div className=" mt-1">
            <h3> Not Enough Cards.</h3>
            <p> You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
            <button className=" btn btn-primary "
            onClick={()=> history.push(`/decks/${deckId}/cards/new`)}> <span className="oi oi-plus mr-2" />Add Cards</button>
            </div>}
      </div>  
    ) }
 
  return "..loading"
    
              }


export default StudyView;
