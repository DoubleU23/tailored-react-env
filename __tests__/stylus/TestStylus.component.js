'use strict'

import React        from 'react'
import Component    from 'react-pure-render/component'

import appConfig    from '../../config/appConfig'

if (process.env.IS_BROWSER) {
    require('./testStylus.styl')
}

const wrapperStyle = {
    border:     '1px solid #333',
    padding:    '2rem',
    margin:     '1rem 0'
}

export default class TestStylus extends Component {

    render() {
        return (
            <div id="testStylus" style={wrapperStyle}>
                <h2>
                    TestStylus Component<br />
                </h2>
                /__tests__/stylus/TestStylus.component.js<br />
                <br />
                <div id="testStylusVars">
                    <b>doubleu23-stylus' ENV vars:</b><br />
                </div>
                <div id="testStylusMQs">
                    <b>MQ mixin:</b><br />
                    stylus' active media query: &nbsp;
                </div>
            </div>
        )
    }

}
