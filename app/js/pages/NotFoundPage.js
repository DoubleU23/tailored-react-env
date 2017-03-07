'use strict'

import React         from 'react'
import DocumentTitle from 'react-document-title'

// const test = 'djfspiaojfp'

const propTypes = {
    currentUser: React.PropTypes.object
}

class NotFoundPage extends React.Component {

    render() {
        return (
            <DocumentTitle title="404: Not Found">
                <section className="not-found-page" />
            </DocumentTitle>
        )
    }

}

NotFoundPage.propTypes = propTypes

export default NotFoundPage
