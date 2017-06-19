'use strict'

import React, {PropTypes} from 'react'
import Component          from 'react-pure-render/component'
import DocumentTitle      from 'react-document-title'

export default class NotFoundPage extends Component {

    static propTypes = {
        currentUser: PropTypes.object
    }

    render() {
        return (
            <DocumentTitle title="404: Not Found">
                <section className="not-found-page" />
            </DocumentTitle>
        )
    }

}
