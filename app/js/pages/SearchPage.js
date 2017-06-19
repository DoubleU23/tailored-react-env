'use strict'

import React, {PropTypes} from 'react'
import Component          from 'react-pure-render/component'
import {Link}             from 'react-router'
import DocumentTitle      from 'react-document-title'

export default class SearchPage extends Component {

    static propTypes = {
        currentUser: PropTypes.object
    }

    constructor(props) {
        super(props)

        this.handleQueryChange = this.handleQueryChange.bind(this)

        this.state = {
            query: ''
        }
    }

    handleQueryChange(evt) {
        this.setState({
            query: evt.target.value
        })
    }

    render() {
        return (
            <DocumentTitle title="Search">
                <section className="search-page">

                    <div>
                        <h1>Search</h1>

                        <h2>Your query: <span>{this.state.query}</span></h2>

                        <input type="text" onChange={this.handleQueryChange} />
                    </div>

                    <div>
                        <Link to="/">Back to Home</Link>
                    </div>

                </section>
            </DocumentTitle>
        )
    }

}
