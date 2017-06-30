'use strict'

import React     from 'react'
import Component from 'react-pure-render/component'

export default class Footer extends Component {

    render() {
        return (
            <div className="testClassName">
                <hr />
                &copy; by <a href="https://github.com/DoubleU23/" target="_blank">DoubleU23</a>
            </div>
        )
    }

}
