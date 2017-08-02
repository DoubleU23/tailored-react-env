'use strict'

import React     from 'react'
import Component from 'react-pure-render/component'
import PropTypes from 'prop-types'

import {inject}  from 'mobx-react'

@inject('messages')
export default class Footer extends Component {

    static propTypes = {
        messages: PropTypes.object.isRequired
    }

    componentWillMount() {
        console.log(this.props.messages)
        const footerMessages    = this.props.messages.footer
        const footerContent     = footerMessages.contentHtml
            ? footerMessages.contentHtml
            : footerMessages.content

        this.content = (
            <div
                className="footerInner"
                dangerouslySetInnerHTML={{__html: footerContent}}
            />
        )
    }

    render() {
        return <footer>this.content</footer>
    }

}
