'use strict'
// REACT
import React                     from 'react'
import Component                 from 'react-pure-render/component'
import ReactDOM                  from 'react-dom'
// ROUTING
import {BrowserRouter as Router} from 'react-router-dom'
import routes                    from './Routes'
// MOBX
import {Provider}                from 'mobx-react'
import store                     from './stores'
import autorun                   from './stores/lib/autorunWrapper'
autorun(store)

if (module.hot) module.hot.accept()

require('babel-polyfill')

if (process.env.NODE_ENV !== 'production' && process.env.IS_BROWSER) {
    // Enable React devtools
    window.React = React
}

class Root extends Component {

    render() {
        return (
            // we inject the substores seperately to not pollute the Components params (performance)
            // this way, we can use @inject('substoreName') to just inject what we need
            <Provider {...store}>
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
