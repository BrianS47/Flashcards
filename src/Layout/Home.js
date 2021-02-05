import React, { useState, useEffect } from "react";
import { useRouteMatch,useHistory } from "react-router-dom";


import { listDecks } from "../utils/api/index";
import DeckList from "./DeckList";

function Home() {
  const [decks, setDecks] = useState([]);
  const { url } = useRouteMatch();
  const history = useHistory()

  useEffect(() => {
    async function loadDecks() {
      listDecks().then((response) => {
        setDecks(response);
      });
    }
    loadDecks();
  }, []);

  if (decks.length) {
    return (
      <div className="container ">
        <div className="row">
          <button size="lg" 
          className="btn btn-secondary mb-1"
          onClick={() => history.push(`${url}decks/new`)}>
            <span className="oi oi-plus" /> <span></span>
            Create Deck
          </button>
        </div>
        <div>
          <DeckList decks={decks} />
        </div>
      </div>
    );
  }
  return "loading";
}
export default Home;
