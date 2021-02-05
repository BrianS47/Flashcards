import React  from "react";
import { useHistory,  useRouteMatch } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";


function Deck({ name, description, cards, deckId }) {
  const history = useHistory();
  const { url } = useRouteMatch();

  function deleteHandler() {
    if (window.confirm("Delete this Deck?")) {
      deleteDeck(deckId)
      .then(()=> history.go(0))
    }
  }

  return (
    <div>
      <div
        className="row   justify-content-around align-items-center border"
        style={{ width: "60%" }}
      >
        <div className="col-8 ">
          <h4 className="text-muted"> {name}</h4>
          <p>{description}</p>
          <button 
          className="btn btn-secondary mr-3 mb-1"
          onClick={()=> history.push(`${url}decks/${deckId}`)}>
            <span className="oi oi-eye mr-2"/>View</button>
          <button
            type="button"
            className="btn btn-primary mb-1"
            onClick={() => history.push(`${url}decks/${deckId}/study`)}
          >
            {" "}
            <span className="oi oi-book mr-2"/>Study
          </button>
        </div>
        <div className="col-2 align-self-start ">
          <p className="text-secondary mb-5"> {cards} cards </p>

          <button
            className="btn btn-danger mb-2  "
            style={{ marginTop: "140px" }}
            onClick={deleteHandler}
          >
            {" "}
            <span className="oi oi-trash"/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Deck;
