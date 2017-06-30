'use strict'

import React, {PropTypes} from 'react'
import Component          from 'react-pure-render/component'
import {observer, inject} from 'mobx-react'

import randomString       from 'randomstring'

@inject('benefits')
@observer
export default class BenefitsDetails extends Component {

    static propTypes = {
        match:      PropTypes.object.isRequired,
        benefits:   PropTypes.object.isRequired
    };

    componentWillMount() {
        this.reacts = 0
    }

    componentWillReact() {
        this.reacts += 1
        console.log('[DetailView->componentWillReact] triggered!')
    }

    getDataDetail = (data, id) =>
        data.find(el => parseInt(el.id) === parseInt(id))

    render() {
        const {
            benefits,
            match: {params: {id}}
        } = this.props

        // if the length changes (after injection)
        // it triggers "componentWillReact"
        // and re-renders
        // because ? testData is a observable ?
        if (!benefits.data.length) {
            // if you come here directly, we have to load the data
            // if you come here from App->List, data is already here
            // ... because the store's constructor is already called
            // which did fetch the data
            return <div>Loading...</div>
        }

        // we don't have the data on constructor/willMount
        // TBD: refactor: find a way to pre-filter before it's rendered
        // (we may need a better Route/Component Structure)
        //
        // tbd: getDataDetail should be in testStore
        const data = this.getDataDetail(benefits.data, id)

        return (
            <div id="detailView">
                <h3>Detail für ID#{id}</h3>
                <b>Title</b>:<br />{data.title}<br /><br />
                <b>Description</b>:<br />{data.description}<br /><br />
                <br />
                <a
                    style={{textDecoration: 'underline', cursor: 'pointer'}}
                    onClick={() => {
                    //  change extracted data => triggers componentWillReact
                        data.title = randomString.generate(11)
                    }}
                >
                    change Title to random string
                </a><br />
                <br />
                Components reacted {this.reacts} times
            </div>
        )
    }

}
