'use strict'

import React, {PropTypes} from 'react'
import Component          from 'react-pure-render/component'
import {observer, inject} from 'mobx-react'

@inject('benefits')
@observer
export default class BenefitsDetails extends Component {

    static propTypes = {
        match:      PropTypes.object.isRequired,
        benefits:   PropTypes.object.isRequired
    };

    constructor(props) {
        super(props)

        this.editMode = false
    }

    componentWillMount() {
        this.reacts = 0
    }

    componentWillReact() {
        this.reacts += 1
        console.log('[DetailView->componentWillReact] triggered!')
    }

    renderValueOrInput(fieldName) {
        const {
            benefits: {data},
            match: {params: {id}}
        }                = this.props
        const benefit    = data[id]
        const fieldValue = benefit[fieldName]
        let innerJSX

        if (!this.editMode) {
            innerJSX = fieldValue
        }
        else {
            innerJSX = (
                <input
                    style={{width: '100%'}}
                    type="textfield"
                    value={fieldValue}
                    onChange={e => {
                        benefit[fieldName] = e.currentTarget.value
                    }}
                />
            )
        }
        return (
            <div className="benefitsDetailsField">
                <b>{fieldName}</b><br />
                {innerJSX}
                <br /><br />
            </div>
        )
    }

    render() {
        const {
            benefits,
            match: {params: {id}}
        } = this.props

        // if the length changes (after injection)
        // it triggers "componentWillReact"
        // and re-renders because testData is a observable
        if (!Object.keys(benefits.data).length) {
            return <div>Loading...</div>
        }

        const date = new Date(benefits.data[id].displayDate).toDateString()

        return (
            <div id="detailView">
                <h3 style={{margin: 0}}>Detail für ID#{id}</h3>
                <a href="#" onClick={() => {
                    this.editMode = !this.editMode
                    return false
                }}>
                    {!this.editMode ? 'bearbeiten' : 'speichern'}
                </a><br />
                <br />

                <span><b>Datum:</b><br />{date + ''}<br /><br /></span>

                {this.renderValueOrInput('title')}

                {this.renderValueOrInput('description')}
            </div>
        )
    }

}
