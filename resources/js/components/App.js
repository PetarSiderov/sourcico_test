import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Recipe from './Recipes/Recipe'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ListRecipes from "./Recipes/ListRecipes";
import NavBar from './Navbar/NavBar';
const App = () => {

        return (
          <div>

              <BrowserRouter>
                  <NavBar/>
                  <div style={{width: "100%", height: '100%'}}>
                      <Switch>
                          <Route exact path='/' component={Recipe} />
                          <Route exact path='/list' component={ListRecipes} />
                      </Switch>
                  </div>
              </BrowserRouter>
          </div>
        )

};

ReactDOM.render(<App />, document.getElementById('app'))
