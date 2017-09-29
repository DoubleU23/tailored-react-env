'use strict'

import React     from 'react'
import Component from 'react-pure-render/component'
import {Link}    from 'react-router-dom'

export default class Nav extends Component {

    getNav() {
        // refactor: use global routeConfig Object?
        // mainRoutes + pageRoutes
        const nav       = []
        const navRoutes = [['items', '/items']]
        if (process.env.DEBUG) {
            navRoutes.unshift(['test', '/test'])
        }
        // home is always first
        navRoutes.unshift(['home', '/'])

        navRoutes.forEach(v => {
            nav.push(<Link to={v[1]} key={v[0]}>{v[0]}</Link>)
            nav.push(<span key={'seperator_' + v[0]}> | </span>)
        })
        // pop the last seperator
        nav.pop()

        return nav
    }

    render() {
        return (
            <div id="nav" style={{margin: '1rem 0'}}>
                {this.getNav()}
            </div>
        )
    }

}
