import React     from 'react'
import Component from 'react-pure-render/component'

export default class Footer extends Component {

    render() {
        const test = '{#FOOTER#}'

        return (
            <div className="testClassName">{test}</div>
        )
    }

}
