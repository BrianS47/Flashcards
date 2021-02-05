import React from "react"
import {useHistory} from "react-router-dom"

function CardForm({deckId,formData,handleChange,handleSubmit,type}) {

  const history= useHistory()    
    
    
    
    return(<div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="front">Front</label>

            <textarea
              className="form-control w-75"
              type="front"
              id="front"
              name="front"
              onChange={handleChange}
              value={formData.front}
              placeholder="Front of the card"
              rows="3"
            />

            <label htmlFor="back" className="mt-3">
              Back
            </label>
            <textarea
              className="form-control w-75"
              type="back"
              id="back"
              name="back"
              onChange={handleChange}
              value={formData.back}
              placeholder="Back of the card"
              rows="3"
            />
          </div>
          { type === "add" ?
          <div>
          <button className="btn btn-secondary mr-2"
          onClick={() => history.push(`/decks/${deckId}`)}>Done</button>
          <button type="submit" className="btn btn-primary">Save</button>
          </div>
           :  <div>
               <button
              className="btn btn-secondary mr-2"
              onClick={() => history.push(`/decks/${deckId}`)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
               </div>}
                 

        </form>
          
          </div>)
}


export default CardForm