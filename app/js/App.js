'use strict'

import React              from 'react'
import Component          from 'react-pure-render/component'
import {Route}            from 'react-router-dom'

import ConfirmationDialog from './components/ConfirmationDialog'

import Header             from './components/layout/Header'
import Footer             from './components/layout/Footer'
import Nav                from './components/layout/Nav'
import Items              from './pages/Items'

import TestComponent      from './components/TestComponent'

if (process.env.IS_BROWSER) {
    require('../styles/index.styl')
}

class App extends Component {

    render() {
        return (
            <div id="wrapper">
                <Header />
                <Nav />
                <div id="content">
                    {process.env.DEBUG &&
                    <Route path="/test" component={TestComponent} />}

                    <Route path="/items" component={Items} />
                </div>

                {/* UI Components (handled by ViewStore) */}
                <ConfirmationDialog />

                <Footer />
            </div>
        )
    }

}

export default App
