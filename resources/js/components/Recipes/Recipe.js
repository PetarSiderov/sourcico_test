import axios from 'axios'
import React, { useState, useEffect } from "react";
import TimePicker from 'react-time-picker';
import 'bootstrap/dist/css/bootstrap.min.css';
export const SET_DROPDOWN_VALUES = "SET_DROPDOWN_VALUES";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Ingredients from "./Ingredients";

const Recipe = () => {
    const [userNameState, setUserNameState] = useState('');
    const [preparationTimeState, setPreparationTimeState] = useState('');
    const [quantityState, setQuantityState] = useState('');
    const [timeState, setTimeState] = useState('1:00');
    const [passwordState, setPasswordState] = useState('');
    const [instructionsState, setInstructionState] = useState('');

    const instructionState = (e) => {
        e.target.instruction = setInstructionState(e.target.value);
    };

    const setUserName = (e) => {
        e.target.name =  setUserNameState(e.target.value);
    };
    const onTimeChange = (e) => {
        e.target.time = setTimeState(e.target.value);
    };
    const setQuantity = (e) => {
        e.target.quantity = setQuantityState(e.target.value);
    };
    const setPreparationTime = (e) => {
        e.target.preparation = setPreparationTimeState(e.target.value);
    };
    const setPassword = (e) => {
        e.target.password = setPasswordState(e.target.value);
    };
    const options = [
        '1h', '30m', '1h:30m'
    ];
    const defaultOption = options[0];

    return (
        <div className='container'
             style={{
                marginTop: '1%',
                marginLeft: '35%',
                marginRight: '5%',
                marginBottom: '5%',
                width: '30%',
                padding: '10px'
            }} >
            <div className="main">
                <div className="col-md-12 col-sm-12">
                    <div className="login-form">
                        <form>
                            <div className="form-group">
                                <label>Recipe name</label>
                                <input name='name' className="form-control"
                                       value={userNameState}
                                       onChange={e => setUserName(e)}
                                       placeholder="Recipe name" />
                            </div>
                            <div className="form-group">
                                <label>preparation time  </label>
                              <input
                                  name='time' className="form-control"
                                  onChange={e => onTimeChange(e)}
                                  value={timeState}
                                  placeholder="time format hh:mm for ex for 30m be 00:30"
                                  />
                            </div>
                            <div className="form-group">
                                <label>Preparation instructions</label>
                                <textarea name='instruction'
                                          className="form-control"
                                          rows='10'
                                          value={instructionsState}
                                          onChange={e => instructionState(e)}
                                          placeholder="Preparation instructions" />
                            </div>
                            <div>
                            </div>
                            <div className="form-group">
                                <label>Recipe ingredients</label>
                                <Ingredients recipeName={userNameState}
                                             quantity={quantityState}
                                             instructionsState={instructionsState}
                                             preparationTimeState={preparationTimeState}
                                             timeState={timeState}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Recipe;
