'use strict'

import React           from 'react'
import PropTypes       from 'prop-types'
import Component       from 'react-pure-render/component'
import {inject}        from 'mobx-react'

import {Route}         from 'react-router-dom'
import BenefitsList    from '../components/benefits/BenefitsList.js'
import BenefitsDetails from '../components/benefits/BenefitsDetails.js'

if (process.env.IS_BROWSER) {
    require('./benefits.styl')
}

@inject('benefits')
export default class Benefits extends Component {

    static propTypes = {
        benefits: PropTypes.object.isRequired
    }

    async componentWillMount() {
        // PREFETCH DATA for benefits subComponents (benefitsStore.fetch())
        // refactor: use "maxLifetime()" usw
        const {benefits} = this.props
        if (!benefits.fetched) {
            await benefits.fetch()
        }
    }

    render() {
        return (
            <div>
                <h2>Benefits</h2>
                {/*
                    space for a page-related module (teaser/header)
                */}
                <Route exact path="/benefits" component={BenefitsList} />
                <Route exact path="/benefits/:id" component={BenefitsDetails} />
            </div>
        )
    }

}
