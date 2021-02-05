import React,{useState,useEffect} from "react"
import {Link,useParams,useHistory} from "react-router-dom"
import {readDeck,updateDeck} from "../utils/api/index"

function EditDeck(){
       const {deckId} = useParams()
       const [deck, SetDeck] = useState({})
       const history = useHistory()
      
      

       useEffect(() => {
      async function loadDeck() {
        const getDeck = await readDeck(deckId)
        SetDeck(getDeck)
      
       }
     
     
      loadDeck()
       }, [deckId])

       const initialFormData = {
         name:""
        

       }
       const [formData, setFormData] = useState({...initialFormData});
       
      useEffect(() => {
      setFormData({ 
        name: deck.name,
        description: deck.description,
        id: deck.id
      })

      }, [deck])
     
       
       const handleSubmit = (event) => {
            event.preventDefault()
            updateDeck(formData)
            .then((response)=> {
              history.push(`/decks/${response.id}`)
            })

       }
        
       
      
       
      
      
        const handleChange = ({ target }) => {
          const value = target.value;
          setFormData({
            ...formData,
            [target.name]: value,
          });
        };

       

     if(Object.keys(deck).length){
    return (
        <div className="container">
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
              <p className="mb-0 text-secondary"> Edit</p>
            </div>
          <h1>Edit Deck</h1>
    
          <div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
    
                <input
                  className="form-control w-75"
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  
                  defaultValue={formData.name} 
                
                
                />
    
                <label htmlFor="description" className="mt-3">
                  Description
                </label>
                <textarea
                  className="form-control w-75"
                  type="text"
                  id="description"
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                  defaultValue={deck.description}
                  rows="5"
                />
              </div>
              <button type="button" className="btn btn-secondary mr-2"
              onClick={()=> history.push(`/decks/${deck.id}`)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      );
            }
          
            return "..loading"

}

export default EditDeck