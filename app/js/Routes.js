'use strict'

import React           from 'react'
import {Switch, Route} from 'react-router-dom'

import store           from './stores/index.js'

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

    // refactor: use global routeConfig Object

    return (
        <Switch>
            {/* benefitRoutes are handled in App->render <Route> */}
            <Route path="/" component={App} />
            <Route path="*" component={NotFoundPage} />
        </Switch>
    )
}

export default createRoutes(store)
