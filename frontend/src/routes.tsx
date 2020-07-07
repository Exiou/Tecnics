import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Main from './pages/Main'
import Product from './pages/Product'
import Detail from './pages/Detail'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Management from './pages/Management'


export default function Routes(){
  return (
    <Router>
        <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/produtos/:product" exact component={Product}/>
            <Route path="/produtos/:product/:productId" exact component={Detail}/>
            <Route path="/users/register" exact component={Register}/>
            <Route path="/users/login" exact component={Login}/>
            <Route path="/users/profile" exact component={Profile}/>
            <Route path="/lojas/:product" exact component={Management}/>
        </Switch>
    </Router>
  )
}