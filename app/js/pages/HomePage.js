'use strict'

import React         from 'react'
import PropTypes     from 'prop-types'
import Component     from 'react-pure-render/component'
import {Link}        from 'react-router'
import DocumentTitle from 'react-document-title'

export default class HomePage extends Component {

    static propTypes = {
        currentUser: PropTypes.object
    }

    render() {
        return (
            <DocumentTitle title="Home">
                <section className="home-page">

                    <div>
                        Home
                    </div>

                    <div>
                        <Link to="/search">Search</Link>
                    </div>

                </section>
            </DocumentTitle>
        )
    }

}
