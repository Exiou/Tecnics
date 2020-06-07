import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Main from './pages/Main'
import Product from './pages/Product'

export default function Routes(){
  return (
    <Router>
        <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/produtos/:product" exact component={Product}/>
        </Switch>
    </Router>
  )
}