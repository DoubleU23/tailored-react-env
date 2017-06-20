import React     from 'react'
import Component from 'react-pure-render/component'

export default class Header extends Component {

    render() {
        const content = '{#HEADER#}'

        return (
            <header>
                {content}
            </header>
        )
    }

}
