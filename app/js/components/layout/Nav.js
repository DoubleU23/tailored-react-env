'use strict'

import React     from 'react'
import Component from 'react-pure-render/component'
import {Link}    from 'react-router-dom'

export default class Nav extends Component {

    getNav() {
        const nav = []
        ;[
            ['home', '/'],
            ['benefits', '/benefits']
        ].forEach(v => {
            nav.push(<Link to={v[1]} key={v[0]}>{v[0]}</Link>)
            nav.push(<span key={'seperator_' + v[0]}> | </span>)
        })
        // pop the last seperator
        nav.pop()
        return nav
    }

    render() {
        return <div id="nav">{this.getNav()}</div>
    }

}
