'use strict'

import React               from 'react'
import PropTypes           from 'prop-types'
import Component           from 'react-pure-render/component'
import {observer, inject}  from 'mobx-react'

import BenefitsListElement from './BenefitsListElement'

@inject('benefits')
@observer
export default class BenetfitsList extends Component {

    static propTypes = {
        benefits: PropTypes.object.isRequired
    };

    renderBenefits() {
        const {benefits: {data}} = this.props
        const benefitsList  = []
        let benefitData
        console.log('[renderBenefits] this.props.benefits.data', data)
        for (let benefitKey in data) {
            benefitData = data[benefitKey]
            benefitsList.push(
                <BenefitsListElement benefit={benefitData} key={'benefitsListElement' + benefitData.benefitCode} />
            )
        }
        return benefitsList
    }

    render() {
        const {benefits} = this.props

        return (
            <div id="benefitsList">
                <h3>Component "BenetfitsList"</h3>

                {benefits.status !== 'success'
                && <div>loading...</div>
                || this.renderBenefits()/* this.renderBenefits() */}
            </div>
        )
    }

}
