'use strict'

import React                       from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import CreateBrowserHistory        from 'history/lib/createBrowserHistory'

import App                         from './App'
import HomePage                    from './pages/HomePage'
import SearchPage                  from './pages/SearchPage'
import NotFoundPage                from './pages/NotFoundPage'

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
        <Router>
            <Route path="/" component={App}>
                <IndexRoute component={HomePage} />

                <Route path="/" component={HomePage} />
                <Route path="/search" component={SearchPage} />
                {/* TBD: authRequired Component + onEnter=requireAuth
                <Route path="/admin" component={SearchPage} onEnter= />
                */}

                <Route path="*" component={NotFoundPage} />
            </Route>
        </Router>
    )
}

export default createRoutes
