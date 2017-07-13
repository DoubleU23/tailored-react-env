'use strict'

import React     from 'react'
import Component from 'react-pure-render/component'

export default class Footer extends Component {

    render() {
        return (
            <div className="testClassName">
                <hr />
                made by <a href="http://www.webundsoehne.com/" target="_blank">Web &amp; S&ouml;hne</a>
            </div>
        )
    }

}
