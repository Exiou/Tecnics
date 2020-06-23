import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Main from './pages/Main'
import Product from './pages/Product'
import Register from './pages/Register'

export default function Routes(){
  return (
    <Router>
        <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/produtos/:product" exact component={Product}/>
            <Route path="/users/register" exact component={Register}/>
        </Switch>
    </Router>
  )
}