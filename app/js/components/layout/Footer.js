'use strict'

import React     from 'react'
import Component from 'react-pure-render/component'

export default class Footer extends Component {

    render() {
        return (
            <div className="testClassName">
                <hr />
                &copy; by SF at <a href="https://www.webundsoehne.com/" target="_blank">Web & Söhne</a>
            </div>
        )
    }

}
