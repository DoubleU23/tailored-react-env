import React          from 'react'
import Component      from 'react-pure-render/component'
import PropTypes      from 'prop-types'

import {inject}       from 'mobx-react'

import AppBar         from 'material-ui/AppBar'
import IconButton     from 'material-ui/IconButton'
import ActionSettings from 'material-ui/svg-icons/action/settings'

@inject('view', 'messages')
export default class Header extends Component {

    static propTypes = {
        view:       PropTypes.object.isRequired,
        messages:   PropTypes.object.isRequired
    }

    render() {
        console.log('this.props.messages', this.props.messages)

        const {
            view:       viewStore,
            messages:   {header: msg}
        } = this.props

        console.log('viewStore.sidebar', viewStore)

        return (
            <header>
                <AppBar
                    title={msg.title}
                    iconElementRight={
                        <IconButton>
                            <ActionSettings
                                onClick={() => {
                                    console.log('test', viewStore)
                                    viewStore.sideBar.isOpen = !viewStore.sideBar.isOpen
                                    console.log('test2', viewStore)
                                    console.log('----------------------------')
                                }}
                            />
                        </IconButton>
                    }
                />
            </header>
        )
    }

}
