'use strict'
// REACT
import React                     from 'react'
import Component                 from 'react-pure-render/component'
import ReactDOM                  from 'react-dom'
// ROUTING
import {Router}                  from 'react-router-dom'
import routes                    from './Routes'
import createBrowserHistory      from 'history/createBrowserHistory'
// MOBX
import {Provider}                from 'mobx-react'
// refactor: unify "store/stores"
import store                     from './stores'
import autorun                   from './stores/lib/autorunWrapper'
autorun(store)
// material-ui
import MuiThemeProvider          from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme               from 'material-ui/styles/getMuiTheme'
// import darkBaseTheme             from 'material-ui/styles/baseThemes/darkBaseTheme'
import lightBaseTheme            from 'material-ui/styles/baseThemes/lightBaseTheme'
import injectTapEventPlugin      from 'react-tap-event-plugin'

import objectAssign              from '../../utils/objectAssign'
import tryCatch                  from '../../utils/tryCatch'

// TBD: make own theme (maybe with "cssobjects-loader"!?)
const myTheme = objectAssign({}, lightBaseTheme, {
    palette: {}
})
const muiTheme = getMuiTheme(myTheme)

// accept data injections from webpack-hot-middleware
if (module.hot) module.hot.accept()
// do not call babelPolyfill twice!
if (!global._babelPolyfill) require('babel-polyfill')

if (process.env.IS_BROWSER) {
    if (process.env.NODE_ENV === 'development') {
        // Enable React devtools
        window.React = React
    }
    // ignore "can't reinject tapEventPlugin"
    // (error only appears with webpack's HMR)
    tryCatch(injectTapEventPlugin)
}


class Root extends Component {

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                {/* we inject the substores seperately,
                so we can use @inject('substoreName')
                to just inject what we need */}
                <Provider {...store}>
                    <Router history={createBrowserHistory()}>
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
