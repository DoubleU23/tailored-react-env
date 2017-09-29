'use strict'

import React         from 'react'
import PropTypes     from 'prop-types'
import Component     from 'react-pure-render/component'
import DocumentTitle from 'react-document-title'
import {inject}      from 'mobx-react'

@inject('messages')
export default class Home extends Component {

    static propTypes = {
        messages: PropTypes.object.isRequired
    }

    render() {
        const {messages: {home: msg}} = this.props

        return (
            <DocumentTitle title="404: Not Found">
                <div>
                    <section className="not-found-page" />
                    <h1>{msg.title}</h1>
                </div>
            </DocumentTitle>
        )
    }

}
