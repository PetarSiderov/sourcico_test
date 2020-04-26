import React, {useState, Fragment, useEffect} from "react";

import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import BaseTable, { Column } from 'react-base-table'
import { Table } from "react-fluid-table";
import BootstrapTable  from 'react-bootstrap-table-next';
import Modal from 'react-modal';
const ListRecipes = (url, config) => {

    const [data , dataSet] = useState(null);
    const [nameRecipe, setNameRecipe] = useState('');
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }
    function closeModal(){
        setIsOpen(false);
    }
    useEffect(() => {
        axios.get('/api/list',).then(response => dataSet(response.data)
        )
            .catch(err => {console.log(err)})}, []);
    const deleteRecipe = (e) => {
        e.target.nameRecipe = setNameRecipe(e.target.value);
    };
    const deleteRest = () => {

        axios.delete(`/api/deleteRecipe/${nameRecipe}`).then(response =>{
                axios.get('/api/list',).then(response => dataSet(response.data)
                )
                    .catch(err => {console.log(err)});
            closeModal();
        }).catch(exception => exception);
    };
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);

    const customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };
    let data4 = [];
    if(data !== null){
        data4 = data && (data.map(data => ({
            id: data.id,
            recipeName: data.recipe_name,
            prepTime: data.preparation_time,
            preparationInstructions: data.preparation_instructions !== undefined ? data.preparation_instructions : '',
            numberIngredients: data.recipe_source !== null && (data.recipe_source),
            recipeSource: data.list_of_ingredients !== null && (data.list_of_ingredients),
            quantity:  data.ingredient_quantity !== null && (data.ingredient_quantity),
        }))).slice();
    }
    const columns = [
        {
            key: 'id',
            name: 'Recipe Id',
            width: 100
        },
        {
            key: "recipeName",
            name: "Recipe Name",
            width: 110,
        },
        {
            key: "prepTime",
            name: "Preparation Time",
            width: 160,
        },
        {
            key: "preparationInstructions",
            name: "Preparation Instructions",
            width: 200,
        },
        {
            key: "numberIngredients",
            name: "Number Ingredients",
            width: 190,
        },
        {
            key: "recipeSource",
            name: "Number Ingredients",
            width: 170
        },
        {
            key: "quantity",
            name: "Number Ingredients",
            width: 150
        },
    ];
    const columnsNew = [
        {
            dataFiled: "id",
            text: "Recipe Id"
        },
        {
            dataFiled: "recipeName",
            text: "Recipe Name",
        },
        {
            dataFiled: "prepTime",
            text: "Preparation Time",
        },
        {
            dataFiled: "preparationInstructions",
            text: "Preparation Instructions",
        },
        {
            dataFiled: "numberIngredients",
            text: "Number Ingredients",
        },
        {
            dataFiled: "recipeSource",
            text: "Number Ingredients"
        },
        {
            dataFiled: "quantity",
            text: "Number Ingredients"
        },
    ];

    return (
        <div className='container' style={{
            marginTop: '5%'
        }}>
            {data4.length > 0 && (
                <BootstrapTable keyField='prepTime' data={[]} columns={columnsNew}/>
            )
            }
            <Table
                data={data4 && data4}
                columns={columns}
                tableHeight={400}
               />
            <button className='btn btn-danger' onClick={openModal}>Delete Recipe</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={_subtitle => (subtitle = _subtitle)}>WARNING</h2>
                <div>Write name of the recipe then click Delete</div>
                <form>
                    <input   name='nameRecipe' className="form-control"
                             onChange={e => deleteRecipe(e)}
                             value={nameRecipe}
                             placeholder="Enter name" />
                    <button className='btn btn-danger' onClick={deleteRest}>DELETE</button>
                    <button className='btn btn-success' onClick={closeModal}>CLOSE</button>
                </form>
            </Modal>
            <Link type="submit" className="btn btn-warning" to='/'>Create Recipe</Link>
        </div>
    )
};
export default ListRecipes;
