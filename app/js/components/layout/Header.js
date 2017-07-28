import Component from 'react-pure-render/component'
import PropTypes from 'prop-types'

import {inject}  from 'mobx-react'

import AppBar    from 'material-ui/AppBar'

@inject('messages')
export default class Header extends Component {

    static propTypes = {
        messages: PropTypes.object.isRequired
    }

    render() {
        const {header: {title}} = this.props.messages

        return (
            <header>
                <AppBar title={title} />
            </header>
        )
    }

}
