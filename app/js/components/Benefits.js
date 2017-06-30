'use strict'

import React              from 'react'
import Component          from 'react-pure-render/component'

import {Route}            from 'react-router-dom'
import BenefitsList       from './benefits/BenefitsList.js'
import BenefitsDetails    from './benefits/BenefitsDetails.js'

export default class Benefits extends Component {

    render() {
        return (
            <div>
                <h3>Benefits</h3>
                {/*
                    space for a page-related module (teaser/header)
                */}
                <Route exact path="/benefits" component={BenefitsList} />
                <Route exact path="/benefits/:id" component={BenefitsDetails} />
            </div>
        )
    }

}
