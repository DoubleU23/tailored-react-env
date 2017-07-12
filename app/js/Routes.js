'use strict'

import React, {Component}   from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
}                           from 'react-router-dom'
// import CreateBrowserHistory from 'history/lib/createBrowserHistory'

import store                from './stores/index.js'

import App                  from './App'
import Benefits             from './pages/Benefits'
import NotFoundPage         from './pages/NotFoundPage'

class RouteTest extends Component {

    render() {
        return <div>RouteTest-render()</div>
    }

}

export const createRoutes = store => {
    const requireAuth = (nextState, _replaceState) => {
        // TBD: loginCheck

        const {user: userStore} = store
        if (userStore.ready && !userStore.isLoggedin) {
            // replaceState(WOHINGENAU?)
        }
    }

    /*
        // TBD: browser/server History (react-router 3.0)
        <Router history={CreateBrowserHistory()}>
    */
    return (
        <Switch>
            <Route path="/" component={App} />
            <Route path="/test" component={RouteTest} />
            <Route path="*" component={NotFoundPage} />
        </Switch>
    )
}

export default createRoutes(store)
