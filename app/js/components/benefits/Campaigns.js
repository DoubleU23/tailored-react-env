'use strict'

import React              from 'react'
import PropTypes          from 'prop-types'
import Component          from 'react-pure-render/component'
import {observer, inject} from 'mobx-react'

// import { Redirect }    from 'react-router'
import {
    observable,
    extendObservable,
    action
}                         from 'mobx'

import RaisedButton       from 'material-ui/RaisedButton'
import FlatButton         from 'material-ui/FlatButton'
import FontIcon           from 'material-ui/FontIcon'
import Paper              from 'material-ui/Paper'
import IconButton         from 'material-ui/IconButton'
import IconDelete         from 'material-ui/svg-icons/action/delete-forever'
import IconCreate         from 'material-ui/svg-icons/content/create'
import Dialog             from 'material-ui/Dialog'

import Locations          from './Locations'
import Vouchers           from './Vouchers'

@inject('benefits', 'messages', 'view')
@observer
export default class Campaigns extends Component {

    static propTypes = {
        // store
        view:               PropTypes.object.isRequired,
        messages:           PropTypes.object.isRequired,
        benefits:           PropTypes.object.isRequired,
        // router
        match:              PropTypes.object.isRequired,
        history:            PropTypes.object.isRequired,
        // custom
        editMode:           PropTypes.bool.isRequired,
        renderValueOrInput: PropTypes.func.isRequired,
        toggleEditMode:     PropTypes.func.isRequired
    };

    constructor(props) {
        super(props)

        this.state = {
            editMode:                   props.editMode,
            updated:                    Date.now(),
            confirmationDialogOpen:     false,
            confirmationDialogContent: 'Are you sure?',
            confirmationDialogAction:   null
        }
    }

    componentDidMount() {
        window.setState = this.setState.bind(this)
    }

    renderCampaignFields() {
        const {
            renderValueOrInput,
            benefits:   benefitsStore,
            match:      {params: {id}},
            messages:   {campaign: msg}
        } = this.props

        const benefit = benefitsStore.data[id]

        const fields = (
            <div className="fields">
                {renderValueOrInput('campaignId',   {subTree: 'campaign'})}
                {renderValueOrInput('name',         {subTree: 'campaign'})}
                {renderValueOrInput('description',  {subTree: 'campaign'})}

                {renderValueOrInput('fromDate',     {subTree: 'campaign'})}
                {renderValueOrInput('dueDate',      {subTree: 'campaign'})}
            </div>
        )

        return (
            <Paper
                zDepth={3}
                style={{
                    minWidth: '50%',
                    padding: '1.5rem 1rem',
                    margin: '0 0 20px',
                    display: 'inline-block'
                }}
            >
                {fields}
                <FlatButton
                    style={{margin: '1.5rem 1rem 1rem 0'}}
                    backgroundColor="#666"
                    hoverColor="#999"
                    icon={<IconCreate />}
                    label={!this.props.editMode ? msg.edit : msg.save}
                    onClick={this.props.editMode
                    ? async () => {
                        this.props.toggleEditMode()
                        await benefitsStore
                            .saveCampaign(benefit.campaign, true)
                    }
                    : this.props.toggleEditMode}
                />
                <FlatButton
                    backgroundColor="#666"
                    hoverColor="#999"
                    label={msg.delete}
                    icon={<IconDelete />}
                    onClick={() => {
                        this.props.view.confirmationDialog = {
                            open:       true,
                            title:      'Sind Sie sicher?',
                            content:    'Wollen Sie die Kampagne wirklich löschen?',
                            action:     () => {
                                benefitsStore.deleteCampaign(id)
                                this.props.view.confirmationDialog.open = false
                            }
                        }
                    }}
                />
            </Paper>
        )
    }

    render() {
        const {
            benefits: benefitsStore,
            match: {params: {id}},
            messages: {campaign: msg}
        } = this.props
        console.log(id, this.props)

        const benefit       = benefitsStore.data[id]
        let hasCampaign

        // TBD: refactor
        // bug: after deleting campaign it errors at "benefit.campaign.campaignId"
        try {
            hasCampaign   = benefit.campaign
                         && benefit.campaign.campaignId != null
        }
        catch (err) {
            hasCampaign = false
        }

        window.benefitTest = benefit

        return (
            <div id="campaigns">
                <h3>{!hasCampaign ? msg.noCampaign : msg.listTitle}</h3>

                {!hasCampaign &&
                <RaisedButton
                    label={msg.addNew}
                    onClick={() => {
                        benefitsStore.createCampaign(id)
                        this.props.toggleEditMode()
                    }}
                />}

                {hasCampaign &&
                <div id="campaignData">

                    {// render Campaign Paper
                    this.renderCampaignFields()}

                    <br />
                    <div id="campaignDataMeta">
                        {!this.props.editMode &&
                        <Locations
                            id={id}
                            campaign={benefit.campaign}
                        />}

                        {!this.props.editMode &&
                        <Vouchers
                            id={id}
                            campaign={benefit.campaign}
                        />}
                    </div>
                </div>}
            </div>
        )
    }

}
