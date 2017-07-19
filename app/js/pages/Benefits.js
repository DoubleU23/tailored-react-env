'use strict'

import React              from 'react'
import PropTypes          from 'prop-types'
import Component          from 'react-pure-render/component'
import {Route}            from 'react-router-dom'

import {inject, observer} from 'mobx-react'

import BenefitsList       from '../components/benefits/BenefitsList.js'
import BenefitsDetails    from '../components/benefits/BenefitsDetails.js'

if (process.env.IS_BROWSER) {
    require('./Benefits.styl')
}

@inject('benefits')
@observer
export default class Benefits extends Component {

    static propTypes = {
        benefits: PropTypes.object.isRequired
    }

    async componentWillMount() {
        // PREFETCH DATA for benefits subComponents (benefitsStore.fetch())
        // refactor: use "maxLifetime()" etc
        const {benefits} = this.props
        if (!benefits.fetched) {
            await benefits.fetch()
        }
    }

    render() {
        if (!this.props.benefits.fetched) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <h2>Benefits</h2>

                <Route exact path="/benefits" component={BenefitsList} />
                <Route exact path="/benefits/:id" component={BenefitsDetails} />
            </div>
        )
    }

}
