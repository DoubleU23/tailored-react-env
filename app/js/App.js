'use strict'

import React         from 'react'
import Component     from 'react-pure-render/component'
import {Route, Link} from 'react-router-dom'

import Header        from './components/layout/Header'
import Footer        from './components/layout/Footer'
import Test          from './components/Test'
import Benefits      from './components/Benefits'

class App extends Component {

    render() {
        return (
            <div style={{height: '5000px'}} id="app">
                <Header />
                <Test />
                <div id="content">
                    <Link to="/benefits" >show Benefits</Link><br />
                    <Route path="/benefits" component={Benefits} />
                </div>
                <Footer />
            </div>
        )
    }

}

export default App
