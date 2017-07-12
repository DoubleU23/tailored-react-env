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
// material-ui
import MuiThemeProvider          from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme               from 'material-ui/styles/getMuiTheme'
import darkBaseTheme             from 'material-ui/styles/baseThemes/darkBaseTheme'
import injectTapEventPlugin      from 'react-tap-event-plugin'

import objectAssign              from '../../utils/objectAssign'

// TBD: make own theme (maybe with "cssobjects-loader"!?)
const myTheme = objectAssign({}, darkBaseTheme, {
    palette: {}
})
const muiTheme = getMuiTheme(myTheme)

// accept data injections from webpack-hot-middleware
if (module.hot) module.hot.accept()

if (!global._babelPolyfill) require('babel-polyfill')

if (process.env.NODE_ENV !== 'production' && process.env.IS_BROWSER) {
    // Enable React devtools
    window.React = React
}
if (process.env.IS_BROWSER) {
    if (process.env.NODE_ENV !== 'production') {
        // Enable React devtools
        window.React = React
    }
    injectTapEventPlugin()
}


class Root extends Component {

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                {/* we inject the substores seperately to not pollute the Components params (performance)
                this way, we can use @inject('substoreName') to just inject what we need */}
                <Provider {...store}>
                    <Router>
                        {routes}
                    </Router>
                </Provider>
            </MuiThemeProvider>
        )
    }

}

if (process.env.IS_BROWSER) {
    ReactDOM.render(
        <Root />,
        document.getElementById('app')
    )
}
