'use strict'

import React              from 'react'
import PropTypes          from 'prop-types'
import Component          from 'react-pure-render/component'
import {observer, inject} from 'mobx-react'

import RaisedButton       from 'material-ui/RaisedButton'

import Campaigns          from './Campaigns'

import {
    observable,
    extendObservable,
    action
} from 'mobx'

@inject('benefits', 'messages')
@observer
export default class BenefitsDetails extends Component {

    static propTypes = {
        messages:   PropTypes.object.isRequired,
        match:      PropTypes.object.isRequired,
        benefits:   PropTypes.object.isRequired
    };

    constructor(props) {
        super(props)

        this.state = {
            editMode:   false
        }
    }

    renderValueOrInput(fieldName, {subTree = false, noInput = false}) {
        const {
            benefits:   {data: benefits},
            benefits:   benefitsStore,
            match:      {params: {id}},
            messages:   {fields: msg}
        }                = this.props
        const benefit    = benefits[id]
        let fieldValue, fieldTitle,
            data, innerJSX

        data       = !subTree ? benefit : benefit[subTree]
        fieldValue = data[fieldName]

        fieldTitle = msg.benefits[fieldName] || msg[subTree][fieldName]

        if (noInput || !this.state.editMode) {
            innerJSX = fieldValue || <i>Noch kein(e) {fieldTitle} vorhanden.</i>
        }
        else {
            innerJSX = (
                <input
                    style={{width: '100%'}}
                    type="textfield"
                    // no null values => force controlled input!
                    value={fieldValue || ''}
                    onChange={e => {
                        if (!subTree) {
                            benefit[fieldName] = e.currentTarget.value
                        }
                        else {
                            benefit[subTree][fieldName] = e.currentTarget.value
                        }
                        benefitsStore.patch(id, benefit)
                    }}
                />
            )
        }
        return (
            <div className="benefitsDetailsField">
                <span className="fieldName label">{fieldTitle}</span><br />
                {innerJSX}
                <br /><br />
            </div>
        )
    }


    toggleEditMode() {
        this.setState({editMode: !this.state.editMode})
        return true
    }

    render() {
        const {
            benefits,
            match: {params: {id}}
        } = this.props

        const benefit     = benefits.data[id]
        const date        = new Date(benefit.date).toDateString()

        return (
            <div id="detailView">
                <h3 style={{margin: 0}}>Detail für #{id}</h3>
                <br />

                <span><b>Datum:</b><br />{date + ''}<br /><br /></span>

                {this.renderValueOrInput('title',       {noInput: true})}
                {this.renderValueOrInput('description', {noInput: true})}

                <Campaigns
                    editMode={this.state.editMode}
                    renderValueOrInput={this.renderValueOrInput.bind(this)}
                    toggleEditMode={this.toggleEditMode.bind(this)}
                    {...this.props}
                />
            </div>
        )
    }

}
