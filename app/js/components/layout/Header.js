import React     from 'react'
import Component from 'react-pure-render/component'

import AppBar    from 'material-ui/AppBar'

export default class Header extends Component {

    render() {
        return (
            <header>
                <AppBar
                    title="Tailored React Environment"
                />
            </header>
        )
    }

}
