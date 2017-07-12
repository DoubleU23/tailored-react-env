'use strict'

import React        from 'react'
import Component    from 'react-pure-render/component'
import {Route}      from 'react-router-dom'

import Header       from './components/layout/Header'
import Footer       from './components/layout/Footer'
import Nav          from './components/layout/Nav'
import Benefits     from './components/Benefits'

import appConfig    from '../../config/appConfig'

if (process.env.IS_BROWSER) {
    require('../styles/index.styl')

    if (!appConfig.isProduction) {
        require('../styles/tests/testStylus.styl')
    }
}
// let testStyle = require('style-loader!css-loader!../styles/index.styl')

// import BenefitsStore from './stores/BenefitsStore.class'

class App extends Component {

    // componentDidMount() {
    //     window.BenefitsStore = BenefitnopmsStore
    // }

    render() {
        return (
            <div style={{height: '5000px'}} id="wrapper">
                <Header />
                <Nav />
                <div id="content">
                    <Route path="/benefits" component={Benefits} />
                </div>
                <Footer />
                { // #debug
                !appConfig.isProduction && <div id="testStylus" />}
            </div>
        )
    }

}

export default App
