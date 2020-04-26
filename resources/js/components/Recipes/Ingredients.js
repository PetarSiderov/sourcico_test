import React, { useState, Fragment } from "react";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

import { Redirect } from 'react-router';

const Ingredients = (recipeName) => {
    const [inputFields, setInputFields] = useState([
        { recipeSource: '', quantity: '' }
    ]);
    const [redirect, setRedicert] =useState(false);
    const handleSubmit = e => {
        e.preventDefault();
    };
    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ recipeSource: '', quantity: '' });
        setInputFields(values);
    };

    const handleRemoveFields = index => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };
    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        if (event.target.name === "recipeSource") {
            values[index].recipeSource = event.target.value;
        } else {
            values[index].quantity = event.target.value;
        }
        setInputFields(values);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const form = {
            name: recipeName.recipeName,
            preparationTime: recipeName.timeState,
            ingredients: inputFields,
            preparationInstructions: recipeName.instructionsState
        };

        axios.post('/api/saveRecipe',{form}).then(response =>
        {
            setRedicert(true);
        }
            )
            .catch(err => {console.log(err)});
    };

     return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    {inputFields.map((inputField, index) => (
                        <Fragment key={`${inputField}~${index}`}>
                            <div className="form-group col-sm-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="recipeSource"
                                    name="recipeSource"
                                    value={inputField.recipeSource}
                                    placeholder="Recipe source"
                                    onChange={event => handleInputChange(index, event)}
                                />
                            </div>
                            <div className="form-group col-sm-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="quantity"
                                    name="quantity"
                                    placeholder="quantity"
                                    value={inputField.quantity}
                                    onChange={event => handleInputChange(index, event)}
                                />
                            </div>
                            <div className="form-group col-sm-2">
                                <button
                                    className="btn btn-link"
                                    type="button"
                                    onClick={() => handleRemoveFields(index)}
                                >
                                    -
                                </button>
                                <button
                                    className="btn btn-link"
                                    type="button"
                                    onClick={() => handleAddFields()}
                                >
                                    +
                                </button>
                            </div>
                        </Fragment>
                    ))}
                </div>
            </form>
            <div className="col-sm-12">
            <button disabled={inputFields[0].recipeSource.length === 0 && inputFields[0].quantity.length === 0} type="submit" style={{marginRight: '5px'}} className="btn btn-success"
                    onClick={e => onSubmit(e)} >Save Recipe</button>
            <Link type="submit" className="btn btn-warning" to='/list'>List All Recipes</Link>
            </div>
            {
                redirect && (
                    <Redirect to={'/list'} />

                )
            }
        </>
    )

};

export default Ingredients;
