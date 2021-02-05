import React, { useState } from "react";
import { Link,useHistory} from "react-router-dom";
import {createDeck} from "../utils/api/index"

function CreateDeck() {

  const history = useHistory()
  
  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    const value = target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const submitHandler =  (event) => {
    event.preventDefault()
    createDeck(formData)
    .then((response)=> {
      history.push(`/decks/${response.id}`)
    })


  }

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

        <span className="mb-0 mr-2">/</span>
        <p className="mb-0 text-secondary"> Create Deck</p>
      </div>
      <h1>Create Deck</h1>

      <div>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="name">Name</label>

            <input
              className="form-control w-75"
              type="name"
              id="name"
              name="name"
              onChange={handleChange}
              value={formData.name}
              placeholder="Deck Name"
            />

            <label htmlFor="description" className="mt-3">
              Description
            </label>
            <textarea
              className="form-control w-75"
              type="description"
              id="description"
              name="description"
              onChange={handleChange}
              value={formData.description}
              placeholder="Brief Description of the Deck"
              rows="5"
            />
          </div>
          <button className="btn btn-secondary mr-2"
          onClick={()=> history.push("/")}>Cancel</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateDeck;
