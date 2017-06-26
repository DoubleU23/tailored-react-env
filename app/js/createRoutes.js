'use strict'

import React                from 'react'
import {
    BrowserRouter as Router,
    Route,
    IndexRoute
}                           from 'react-router-dom'
// import CreateBrowserHistory from 'history/lib/createBrowserHistory'

import App                  from './App'
import HomePage             from './pages/HomePage'
import SearchPage           from './pages/SearchPage'
import NotFoundPage         from './pages/NotFoundPage'

const createRoutes = store => {
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
        <Route path="/" component={App}>
            <IndexRoute component={HomePage} />

            <Route path="/" component={HomePage} />
            <Route path="/search" component={SearchPage} />
            {/* TBD: authRequired Component + onEnter=requireAuth
            <Route path="/admin" component={SearchPage} onEnter= />
            */}

            <Route path="*" component={NotFoundPage} />
            {/* new v4 syntax "Miss" suggested by several tutorials
            but i can't import {Miss} from 'react-router'
            <Miss component={NotFoundPage}/>
            */}
        </Route>
    )
}

export default createRoutes
