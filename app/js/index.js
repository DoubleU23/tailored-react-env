'use strict'

import React     from 'react'
import Component from 'react-pure-render/component'
import ReactDOM  from 'react-dom'

/*, IndexRoute */
import {Router, Route}      from 'react-router'
import CreateBrowserHistory from 'history/lib/createBrowserHistory'

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

    render() {
        return (
            <Router history={CreateBrowserHistory()}  >
                {routes}
            </Router>
        )
    }

}

ReactDOM.render(
    <Root />,
    document.getElementById('app')
)
