'use strict'

import React              from 'react'
import Component          from 'react-pure-render/component'
import {Route}            from 'react-router-dom'

import ConfirmationDialog from './components/ConfirmationDialog'

import Header             from './components/layout/Header'
import Footer             from './components/layout/Footer'
import Nav                from './components/layout/Nav'
import Benefits           from './pages/Benefits'

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
                <Footer />

                {/* globalComponents (handled by ViewStore) */}
                <ConfirmationDialog />
            </div>
        )
    }

}

export default App
