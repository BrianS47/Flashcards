import React from "react"
import {useRouteMatch,useHistory} from "react-router-dom"
import {deleteCard} from "../utils/api/index"

function Card({front,back,id}) {
    const {url} = useRouteMatch()
    const history = useHistory()

    function deleteCardHandler() {
        if(window.confirm("Delete this Card?")) {
            deleteCard(id)
            .then(() => history.go(0))
            
        }
    }
    
    if(id){
    return (
     <div className= "row   justify-content-around align-items-center border "
     style={{ width: "60%" }}
   >
       <div className= "col" style ={{width:"40%"}}>
       <p className="py-5">{front}</p>
       </div>
       <div className="col" style ={{width:"40%"}}>
       <p className=" pt-5">{back}</p>  
       <div className="row ml-5">
       <button className="btn btn-secondary my-2 mr-3 ml-5"
       onClick={()=> history.push(`${url}/cards/${id}/edit`)}>
           <span className="oi oi-pencil mr-2 "/>Edit</button>
       <button className="btn btn-danger my-2 " onClick={deleteCardHandler}>
           <span className="oi oi-trash px-1"></span>
       </button>
       </div>
       </div>
       

   </div>
    )
    }
    return null
}

export default Card