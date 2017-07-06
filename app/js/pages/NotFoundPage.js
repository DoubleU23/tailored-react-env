'use strict'

import React         from 'react'
import PropTypes     from 'prop-types'
import Component     from 'react-pure-render/component'
import DocumentTitle from 'react-document-title'

export default class NotFoundPage extends Component {

    static propTypes = {
        currentUser: PropTypes.object
    }

    render() {
        return (
            <DocumentTitle title="404: Not Found">
                <div>
                    <section className="not-found-page" />
                    <h1>404 - Page not found!</h1>
                </div>
            </DocumentTitle>
        )
    }

}
