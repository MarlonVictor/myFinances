import React, { useContext } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import { AuthContext } from './contexts/AuthContext'
import { Auth } from './pages/Auth'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'


function Routes() {
    const { user } = useContext(AuthContext)

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/home" exact component={Home} />
                <Route path="/" exact>
                    {user ? <Redirect to="/home" /> : <Auth />}
                </Route>
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
