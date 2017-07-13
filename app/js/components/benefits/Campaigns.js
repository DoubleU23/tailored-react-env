'use strict'

import React              from 'react'
import PropTypes          from 'prop-types'
import Component          from 'react-pure-render/component'
import {observer, inject} from 'mobx-react'

// import { Redirect } from 'react-router'
import {
    observable,
    extendObservable,
    action
} from 'mobx'

import RaisedButton       from 'material-ui/RaisedButton'

@inject('benefits', 'messages')
@observer
export default class Campaigns extends Component {

    static propTypes = {
        match:              PropTypes.object.isRequired,
        history:            PropTypes.object.isRequired,
        messages:           PropTypes.object.isRequired,
        benefits:           PropTypes.object.isRequired,
        // custom
        editMode:           PropTypes.bool.isRequired,
        renderValueOrInput: PropTypes.func.isRequired,
        toggleEditMode:     PropTypes.func.isRequired
    };

    constructor(props) {
        super(props)

        this.state = {
            editMode: props.editMode,
            updated:  Date.now()
        }
    }

    componentWillReact(props) {
        console.log('[Campaigns->componentWillReact()] props', props)
        this.setState({updated: Date.now()})
    }

    render() {
        const {
            renderValueOrInput,
            benefits: benefitsStore,
            history,
            match: {params: {id}}
        } = this.props
        console.log(id, this.props)

        const benefit     = benefitsStore.data[id]
        const hasCampaign = typeof benefit.campaign === 'object'
                         && benefit.campaign.campaignId != null

        window.benefitTest = benefit

        return (
            <div id="campaigns">
                {!hasCampaign &&
                <RaisedButton
                    label={'Campaign anlegen'}
                    onClick={() => {
                        extendObservable(benefit, {
                            campaign: {
                                // id:             id >> 0,
                                // benefitCode:    id >> 0,
                                campaignId:     415646,
                                description:    'I am an invention of the backend devs',
                                dueDate:        '2018-09-28T10:04:00.000Z',
                                fromDate:       '2017-07-01T10:04:00.000Z',
                                name:           'generierte Campaign',
                                type:           1,
                                createNew:      true
                            }
                        })

                        this.props.toggleEditMode()
                    }}
                />}

                {hasCampaign &&
                <div id="campaignData">
                    <h3>zugehörige Kampagne:</h3>
                    <div className="fields">
                        {renderValueOrInput('campaignId',   {subTree: 'campaign'})}
                        {renderValueOrInput('name',         {subTree: 'campaign'})}
                        {renderValueOrInput('description',  {subTree: 'campaign'})}

                        {renderValueOrInput('fromDate',     {subTree: 'campaign'})}
                        {renderValueOrInput('dueDate',      {subTree: 'campaign'})}

                        <RaisedButton
                            label={!this.props.editMode
                                ? 'Campaign bearbeiten'
                                : 'Campaign speichern'
                            }
                            onClick={this.props.editMode
                            ? async () => {
                                const response = await benefitsStore
                                    .saveCampaign(benefit.campaign, true)
                                console.log('saveCampaign->response', response)
                                this.props.toggleEditMode()
                            }
                            : this.props.toggleEditMode}
                        />
                    </div>
                </div>}
            </div>
        )
    }

}
