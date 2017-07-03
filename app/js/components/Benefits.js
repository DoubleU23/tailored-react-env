'use strict'

import React, {PropTypes} from 'react'
import Component          from 'react-pure-render/component'
import {inject}           from 'mobx-react'

import {Route}            from 'react-router-dom'
import BenefitsList       from './benefits/BenefitsList.js'
import BenefitsDetails    from './benefits/BenefitsDetails.js'

@inject('benefits')
export default class Benefits extends Component {

    static propTypes = {
        benefits: PropTypes.object.isRequired
    }

    async componentWillMount() {
        // PREFETCH DATA for benefits subComponent (benefitsStore.fetch())
        // refactor: use "maxLifetime()" usw
        const {benefits} = this.props
        if (!benefits.fetched) {
            await benefits.fetch()
        }
    }

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
