'use strict'

import React         from 'react'
import Component     from 'react-pure-render/component'
import {Route}       from 'react-router-dom'

import Header        from './components/layout/Header'
import Footer        from './components/layout/Footer'
import Nav           from './components/layout/Nav'
import Benefits      from './components/Benefits'

import TestComponent from './components/TestComponent'

import appConfig     from '../../config/appConfig'

if (process.env.IS_BROWSER) {
    require('../styles/index.styl')
}

class App extends Component {

    render() {
        return (
            <div style={{height: '5000px'}} id="wrapper">
                <Header />
                <Nav />
                <div id="content">
                    <Route path="/benefits" component={Benefits} />
                </div>
                {process.env.DEBUG && <TestComponent />}
                <Footer />
            </div>
        )
    }

}

export default App
