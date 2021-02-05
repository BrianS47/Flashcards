import React from "react"
import Card from "./Card"

function CardList({cards}) {

    if(cards){
const list = cards.map((card,index) => 

   <li key={index} style={{listStyle:"none"}}> <Card front={card.front} back={card.back} id={card.id} /></li>
)

return (
    <div>
        <h3>Cards</h3>
        {list}
    </div>
)

    }
    return "..loading"
}

export default CardList