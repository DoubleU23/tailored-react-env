'use strict'

import React, {PropTypes} from 'react'
import Component          from 'react-pure-render/component'
import ReactDOM           from 'react-dom'

// ROUTING
import {
    BrowserRouter as Router,
    Match,
    Route,
    Switch,
    IndexRoute
}                           from 'react-router-dom'
// import CreateBrowserHistory from 'history/lib/createBrowserHistory'

// nothing

// MOBX
import { Provider } from 'mobx-react'
import store, {stores}     from './stores'
import autorun      from './stores/lib/autorunWrapper.js'
autorun(stores)

// import Routes            from './Routes'
import App                  from './App'
import HomePage             from './pages/HomePage'
import SearchPage           from './pages/SearchPage'
import NotFoundPage         from './pages/NotFoundPage'

if (module.hot) module.hot.accept()

if (process.env.NODE_ENV !== 'production' && process.env.IS_BROWSER) {
    // Enable React devtools
    window.React = React
}

// nothing

class RootTest extends Component {

    render() {
        return <div>RouteTest-render()</div>
    }

}

const createRoutes = () => (
    <Switch>
        <Route exact path="/" component={App} />
        <Route path="/test" component={RootTest} />
        <Route path="*" component={NotFoundPage} />
    </Switch>
)
// refactor: export = debugging helper
export const routes = createRoutes()


export class Root extends Component {

    constructor(props) {
        super(props)

        console.log('process.env.IS_BROWSER?', process.env.IS_BROWSER)

        // console.log('store (default)', store)
        // console.log('stores (fm)', store)
    }

    render() {
        console.log('[Root->render()]')

        return (
            <Provider store={store}>
                {/* <App /> */}
                <Router>
                    {routes}
                </Router>
            </Provider>
        )
    }

}

if (process.env.IS_BROWSER) {
    ReactDOM.render(
        <Root />,
        document.getElementById('app')
    )
}
