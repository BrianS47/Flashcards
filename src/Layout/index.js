import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import StudyView from "./StudyView";
import CreateDeck from "./CreateDeck";
import DeckView from "./DeckView";
import EditDeck from "./EditDeck"
import AddCard from "./AddCard"
import EditCard from "./EditCard"

import { Route, Switch,  useRouteMatch } from "react-router-dom";

function Layout() {
  const { url } = useRouteMatch();
  
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path={`${url}decks/:deckId/cards/:cardId/edit`}>
            <EditCard/>
          </Route>
          <Route path={`${url}decks/:deckId/cards/new`}>
            <AddCard/>

          </Route>
          <Route path={`${url}decks/:deckId/study`}>
            <StudyView />
          </Route>
          <Route path ={`${url}decks/:deckId/edit`}>
            <EditDeck/>
          </Route>
          
          <Route path={`${url}decks/new`}>
            <CreateDeck />
          </Route>
          <Route path={`${url}decks/:deckId`}>
            <DeckView />
          </Route>
         
          

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
