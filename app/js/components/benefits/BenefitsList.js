'use strict'

import React, {PropTypes} from 'react'
import Component          from 'react-pure-render/component'
import {observer, inject} from 'mobx-react'

import BenefitsListElement from './BenefitsListElement'

@inject('benefits')
@observer
export default class BenetfitsList extends Component {

    static propTypes = {
        benefits: PropTypes.object.isRequired
    };

    render() {
        const {benefits} = this.props

        return (
            <div id="benefitsList">
                <h3>Component "BenetfitsList"</h3>
                <div>
                    <b>benefits.status:</b><br />{benefits.status}<br /><br />
                    <b>benefits.data.length:</b><br />{benefits.data.length}<br /><br />
                </div>

                {benefits.data.map((v, i) =>
                    <BenefitsListElement benefit={v} key={'benefitsListElement' + i} />
                )}
                <br /><br />
            </div>
        )
    }

}
