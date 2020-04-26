import React, {useState, Fragment, useEffect} from "react";

import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import {Redirect} from "react-router";
import { Table } from "react-fluid-table";
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
      //  console.log(data);
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
    const columns = [
        {
            key: "recipeName",
            name: "Recipe Name",
            width: 300,
            height: 100
        },
        {
            key: "prepTime",
            name: "Preparation Time",
            width: 300,
            height: 100
        },
        {
            key: "preparationInstructions",
            name: "Preparation Instructions",
            height: 100,
            width: 300
        },
    ];
    let data4 = '';
    if(data !== null){
        console.log(data);
        data4 = data.map(data => ({
        recipeName: data.recipe_name,
        prepTime: data.preparation_time,
        preparationInstructions: data.preparation_instructions
    }));
    }
    return (
        <div className='container' style={{
            marginTop: '10%'
        }}>
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
