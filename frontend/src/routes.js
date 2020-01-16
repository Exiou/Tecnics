import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Main from './pages/main'
import Processadores from './pages/processadores'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/processadores" component={Main} />
            <Route path="/processadores/:id" component={Processadores} />
        </Switch>
    </BrowserRouter>
)

export default Routes