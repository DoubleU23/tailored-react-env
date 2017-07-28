'use strict'

import PropTypes     from 'prop-types'
import Component     from 'react-pure-render/component'
import DocumentTitle from 'react-document-title'
import {inject}      from 'mobx-react'

@inject('messages')
export default class NotFoundPage extends Component {

    static propTypes = {
        messages: PropTypes.object.isRequired
    }

    render() {
        const {messages: {404: msg}} = this.props

        return (
            <DocumentTitle title="404: Not Found">
                <div>
                    <section className="not-found-page" />
                    <h1>{msg.headline}</h1>
                </div>
            </DocumentTitle>
        )
    }

}
