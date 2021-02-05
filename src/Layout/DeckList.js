import React from "react"
import Deck from "./Deck"


function DeckList({decks}) {


 
const list = decks.map((deck,index) => 
  
      
  
  <li key ={index} style={{listStyle:" none"}}> <Deck name={deck.name} description={deck.description} cards={deck.cards.length}  deckId={deck.id}/></li>
)

return (
    <div>
        
        {list}
    </div>
)

}

export default DeckList