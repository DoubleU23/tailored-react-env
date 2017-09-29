'use strict'

import React           from 'react'
import {Switch, Route} from 'react-router-dom'

import store           from './stores/index.js'

// TBD: use routeTree.js and try to setup nested routes like in react-router@<4
// import routeTree, {routes}       from './routeTree'

import App             from './App'
import NotFoundPage    from './pages/NotFoundPage'

export const createRoutes = store => {
    // TBD: loginCheck
    // const requireAuth = (nextState, _replaceState) => {

    //     const {user: userStore} = store
    //     if (userStore.ready && !userStore.isLoggedin) {
    //         // replaceState(WOHINGENAU?)
    //     }
    // }

    return (
        <Switch>
            <Route path="/" component={App} />
            <Route path="*" component={NotFoundPage} />
        </Switch>
    )
}

export default createRoutes(store)
