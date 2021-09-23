import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Auth } from './pages/Auth'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'


function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Auth} />
                <Route path="/home" exact component={Home} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes