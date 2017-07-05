'use strict'

import React         from 'react'
import Component     from 'react-pure-render/component'
import {Route}       from 'react-router-dom'

import Header        from './components/layout/Header'
import Footer        from './components/layout/Footer'
import Nav           from './components/layout/Nav'
import Benefits      from './components/Benefits'

// import BenefitsStore from './stores/BenefitsStore'

class App extends Component {

    // componentDidMount() {
    //     window.BenefitsStore = BenefitsStore
    // }

    render() {
        return (
            <div style={{height: '5000px'}} id="app">
                <Header />
                <Nav />
                <div id="content">
                    <Route path="/benefits" component={Benefits} />
                </div>
                <Footer />
            </div>
        )
    }

}

export default App
