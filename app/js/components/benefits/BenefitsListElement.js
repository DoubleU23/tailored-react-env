'use strict'

import React     from 'react'
import PropTypes from 'prop-types'
import Component from 'react-pure-render/component'
import {Link}    from 'react-router-dom'

export default class BenefitsListElement extends Component {

    static propTypes = {
        benefit:    PropTypes.object.isRequired
    };

    render() {
        const {benefit} = this.props

        return (
            <div className="benefitListElement" key={'benefitListElement_' + benefit.benefitCode}>
                benefit#{benefit.benefitCode}:<br />
                <Link to={'/benefits/' + benefit.benefitCode}>
                    {benefit.title}
                </Link>&nbsp;
                {typeof benefit.campaign === 'object' &&
                <span> (campaign available!)</span>}
                <br /><br />
            </div>
        )
    }

}
