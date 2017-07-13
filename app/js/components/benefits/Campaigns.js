'use strict'

import React              from 'react'
import PropTypes          from 'prop-types'
import Component          from 'react-pure-render/component'
import {observer, inject} from 'mobx-react'

// import { Redirect } from 'react-router'


import RaisedButton       from 'material-ui/RaisedButton'

@inject('benefits', 'messages')
@observer
export default class Campaigns extends Component {

    static propTypes = {
        history:            PropTypes.object.isRequired,
        messages:           PropTypes.object.isRequired,
        benefits:           PropTypes.object.isRequired,
        // custom
        editMode:           PropTypes.bool.isRequired,
        benefit:            PropTypes.object.isRequired,
        renderValueOrInput: PropTypes.func.isRequired,
        toggleEditMode:     PropTypes.func.isRequired
    };

    constructor(props) {
        super(props)

        this.state = {
            editMode: props.editMode
        }
    }

    render() {
        const {
            renderValueOrInput,
            benefits: benefitsStore,
            benefit,
            history
        } = this.props

        const hasCampaign = typeof benefit.campaign === 'object'
                         && benefit.campaign.campaignId

        window.benefitTest = benefit

        window.History = History

        return (
            <div id="campaigns">
                {!hasCampaign &&
                <RaisedButton
                    label={'Campaign anlegen'}
                    onClick={() => {
                        history.push('./campaign')
                    }}
                    // onClick={() => this.props.toggleEditMode()}
                />}

                {hasCampaign &&
                <div id="campaignData">
                    <h3>zugehörige Kampagne:</h3>
                    <div className="fields">
                        {renderValueOrInput('campaignId', {subTree: 'campaign'})}
                        {renderValueOrInput('name', {subTree: 'campaign'})}
                        {renderValueOrInput('description', {subTree: 'campaign'})}

                        {renderValueOrInput('fromDate', {subTree: 'campaign'})}
                        {renderValueOrInput('dueDate', {subTree: 'campaign'})}

                        <RaisedButton
                            label={'Campaign bearbeiten'}
                            // onClick={() => {
                            //     history.push('./campaign')
                            // }}
                            onClick={this.props.editMode
                            ? async () => {
                                const response = await benefitsStore.saveCampaign(benefit.campaign)
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
