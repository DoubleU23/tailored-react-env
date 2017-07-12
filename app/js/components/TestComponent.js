'use strict'

import React        from 'react'
import Component    from 'react-pure-render/component'

import TestStylus   from '../../../__tests__/stylus/TestStylus.component'

import appConfig    from '../../../config/appConfig'

export default class TestComponent extends Component {

    render() {
        return (
            <div id="testComponent">
                <TestStylus />
            </div>
        )
    }

}
