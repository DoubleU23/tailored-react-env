import React          from 'react'
import Component      from 'react-pure-render/component'
import PropTypes      from 'prop-types'

import {inject, observer}       from 'mobx-react'

import AppBar          from 'material-ui/AppBar'
import IconButton      from 'material-ui/IconButton'
import ActionSettings  from 'material-ui/svg-icons/action/settings'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import NavigationOpen  from 'material-ui/svg-icons/navigation/menu'

@inject('view', 'messages')
@observer
export default class Header extends Component {

    static propTypes = {
        view:       PropTypes.object.isRequired,
        messages:   PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)

        this.getToggleFn.bind(this)
    }

    toggleNavBar() {
        const {view: viewStore} = this.props
        viewStore.navBar.isOpen = !viewStore.navBar.isOpen
    }

    /**
     * Returns the proper toggle function.
     *
     * @param      {String}     whichBar  'navBar' || 'sideBar'
     * @return     {Function}   The toggle function.
     */
    getToggleFn(whichBar) {
        const {view: viewStore} = this.props

        return () => {
            viewStore[whichBar].isOpen = !viewStore[whichBar].isOpen
        }
    }

    render() {
        const {
            view:       viewStore,
            messages:   {header: msg}
        } = this.props

        const NavBarToggleIcon = viewStore.navBar.isOpen
            ? NavigationClose
            : NavigationOpen

        return (
            <header>
                <AppBar
                    title={msg.title}
                    // NAVBAR TOGGLER
                    iconElementLeft={
                        <IconButton>
                            <NavBarToggleIcon onClick={this.getToggleFn('navBar')} />
                        </IconButton>
                    }
                    // SIDEBAR TOGGLER
                    iconElementRight={
                        <IconButton>
                            <ActionSettings onClick={this.getToggleFn('sideBar')} />
                        </IconButton>
                    }
                />
            </header>
        )
    }

}
