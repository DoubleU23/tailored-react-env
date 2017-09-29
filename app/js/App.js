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
import SideBar            from './components/layout/Sidebar.js'

if (process.env.IS_BROWSER) {
    require('../styles/index.styl')
}

class App extends Component {

    render() {
        return (
            <div id="wrapper">
                <Header />
                {/* refactor:
                shove <Sidebar> + children(=content) into own wrapper Component
                this way we can put an abstracted sidebar wrapper into /stack/lib/components
                and use /app/js/components/layout/Sidebar to define the sidebar-content */}
                <SideBar title="Settings" subTitle={'(Title and subTitle - passed per props)'}>
                    <div style={{fontStyle: 'italic'}}>
                        This is an Child-Element<br />of the &lt;SideBar&gt; Component
                    </div>
                </SideBar>

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
