'use strict'

import React, {PropTypes} from 'react'
import Component          from 'react-pure-render/component'
import ReactDOM           from 'react-dom'

// ROUTING
import {Router, Route}      from 'react-router'
import CreateBrowserHistory from 'history/lib/createBrowserHistory'

// MOBX
import { Provider } from 'mobx-react'
import store, {stores}     from './stores'
import autorun      from './stores/lib/autorunWrapper.js'
autorun(stores)

// import Routes            from './Routes'
import App                  from './App'

if (module.hot) module.hot.accept()

if (process.env.NODE_ENV !== 'production') {
    // Enable React devtools
    window.React = React
}

const createRoutes = () => (
    <Route path="/" component={App} />
)
const routes = createRoutes()


class Root extends Component {

    constructor(props) {
        super(props)

        console.log('process.env.IS_BROWSER?', process.env.IS_BROWSER)

        console.log('store (default)', store)
        console.log('stores (fm)', store)
    }

    render() {
        return (
            <Provider store={store}>
                <App />
                {/* <Router history={CreateBrowserHistory()}  >
                    {routes}
                </Router> */}
            </Provider>
        )
    }

}

ReactDOM.render(
    <Root />,
    document.getElementById('app')
)
