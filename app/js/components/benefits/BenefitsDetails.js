'use strict'

import React              from 'react'
import PropTypes          from 'prop-types'
import Component          from 'react-pure-render/component'
import {observer, inject} from 'mobx-react'

import RaisedButton       from 'material-ui/RaisedButton'

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
            editMode: false
        }
    }

    componentWillMount() {
        this.reacts = 0
    }

    componentWillReact() {
        this.reacts += 1
        console.log('[DetailView->componentWillReact] triggered!')
    }

    renderValueOrInput(fieldName, subTree = false) {
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

        fieldTitle    = msg.benefits[fieldName] || msg.benefits[subTree][fieldName]

        if (!this.state.editMode) {
            innerJSX = fieldValue || <i>Noch kein(e) {fieldTitle} vorhanden.</i>
        }
        else {
            innerJSX = (
                <input
                    style={{width: '100%'}}
                    type="textfield"
                    value={fieldValue}
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
                <b>{fieldTitle}</b><br />
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
        const self = this
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

        const benefit     = benefits.data[id]
        const hasCampaign = typeof benefit.campaign === 'object'
                         && benefit.campaign.campaignId
        const campaign  = hasCampaign
            ? benefit.campaign
            : null

        const date        = new Date(benefit.date).toDateString()

        return (
            <div id="detailView">
                <h3 style={{margin: 0}}>Detail für ID#{id}</h3>
                <br />

                <span><b>Datum:</b><br />{date + ''}<br /><br /></span>

                {this.renderValueOrInput('title')}

                {this.renderValueOrInput('description')}

                <div className="campaignData">
                    {this.renderValueOrInput('id', 'campaign')}
                </div>

                <RaisedButton
                    label={!this.state.editMode ? 'bearbeiten' : 'speichern'}
                    onClick={() => this.toggleEditMode()}
                />

            </div>
        )
    }

}
