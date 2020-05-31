import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Main from './pages/Main'

export default function Routes(){
  return (
    <Router>
        <Switch>
            <Route path="/" exact component={Main}/>
        </Switch>
    </Router>
  )
}