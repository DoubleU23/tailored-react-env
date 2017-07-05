'use strict'

import React, {PropTypes} from 'react'
import Component          from 'react-pure-render/component'
import {Link}             from 'react-router-dom'

export default class BenefitsListElement extends Component {

    static propTypes = {
        // from BenefitsList
        benefit: PropTypes.object.isRequired
    };

    render() {
        const {benefit} = this.props

        return (
            <div className="benefitListElement" key={'benefitListElement' + benefit.id}>
                <Link to={'/benefits/' + benefit.id}>Details</Link>&nbsp;
                for id "{benefit.id}"
                {benefit.campaign &&
                <span>(campainId: {benefit.campaign.id})</span>}
            </div>
        )
    }

}
