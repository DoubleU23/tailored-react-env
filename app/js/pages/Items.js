'use strict'

import React              from 'react'
import PropTypes          from 'prop-types'
import Component          from 'react-pure-render/component'
import {Route}            from 'react-router-dom'

import {inject, observer} from 'mobx-react'

import ItemsList          from '../components/items/ItemsList'
import ItemDetails        from '../components/items/ItemDetails'

if (process.env.IS_BROWSER) {
    require('./Items.styl')
}

@inject('items')
@observer
export default class Items extends Component {

    static propTypes = {
        items: PropTypes.object.isRequired
    }

    async componentWillMount() {
        // PREFETCH DATA for items subComponents (itemsStore.fetch())
        // refactor: use "maxLifetime()" etc
        const {items} = this.props
        if (!items.fetched) {
            await items.fetch()
        }
    }

    render() {
        if (!this.props.items.fetched) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <h2>Items</h2>

                <Route exact path="/items" component={ItemsList} />
                <Route exact path="/items/:id" component={ItemDetails} />
            </div>
        )
    }

}
