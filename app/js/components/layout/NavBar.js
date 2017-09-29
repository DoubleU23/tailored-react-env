import React              from 'react'
import Component          from 'react-pure-render/component'
import PropTypes          from 'prop-types'

import {inject, observer} from 'mobx-react'

import Drawer             from 'material-ui/Drawer'
import MenuItem           from 'material-ui/MenuItem'

import {routes}           from '../../routeTree'

// if (process.env.IS_BROWSER) {
//     require('./NavBar.styl')
// }

@inject('view', 'messages')
@observer
export default class NavBar extends Component {

    static propTypes = {
        history:    PropTypes.object.isRequired,
        // stores
        view:       PropTypes.object.isRequired,
        messages:   PropTypes.object.isRequired,
        // content
        children:   PropTypes.object,
        // custom
        title:      PropTypes.string,
        subTitle:   PropTypes.string
    }

    constructor(props) {
        super(props)

        this.handleRoute.bind(this)
    }

    handleRoute(route) {
        const {
            history,
            view: viewStore
        } = this.props

        return () => {
            history.push(route)
            setTimeout(() => {
                viewStore.navBar.isOpen = false
            }, 300)
        }
    }

    renderMenuItems() {
        return routes.map(route =>
            <MenuItem
                key={'navBar_menuItem_' + route.key}
                onClick={this.handleRoute(route.route)}
            >
                {route.title}
            </MenuItem>
        )
    }

    render() {
        const {
            view:       viewStore,
            messages:   {navBar: msg},
            title, subTitle
        } = this.props

        return (
            <Drawer
                open={viewStore.navBar.isOpen}
                docked={false}

                containerClassName="sidebar"
                containerStyle={{
                    padding:            '1rem 0.5rem',
                    top:                '64px',
                    height:             window.innerHeight - 64,
                    backgroundColor:    '#fff'
                }}
                overlayStyle={{top: '64px'}}
            >
                {(msg.title || title) &&
                <h2 className="title">
                    {msg.title || title}

                    {subTitle &&
                    <span className="subTitle">{subTitle}</span>}
                </h2>}

                {this.renderMenuItems()}
            </Drawer>
        )
    }

}
