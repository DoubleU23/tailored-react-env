'use strict'

import React              from 'react'
import PropTypes          from 'prop-types'
import Component          from 'react-pure-render/component'
import {observer, inject} from 'mobx-react'

@inject('benefits')
@observer
export default class Test extends Component {

    static propTypes = {
        benefits: PropTypes.object.isRequired
    }

    render() {
        return (
            <div>
                benefits.foo in childComponent "Test":<br />
                {this.props.benefits.foo}
            </div>
        )
    }

}
