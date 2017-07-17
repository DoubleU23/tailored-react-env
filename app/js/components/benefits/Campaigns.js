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
            updated:  Date.now(),
            confirmationDialogOpen: false,
            confirmationDialogContent: 'Are you sure?',
            confirmationDialogAction: null
        }
    }

    componentWillReact(props) {
        console.log('[Campaigns->componentWillReact()] props', props)
        this.setState({updated: Date.now()})
    }

    renderCampaignFields() {
        const {
            renderValueOrInput,
            benefits: benefitsStore,
            match: {params: {id}}
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

        // if (this.props.editMode) {
        //     return fields
        // }
        // else {
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
                <FlatButton
                    backgroundColor="#666"
                    hoverColor="#999"
                    label="Kampagne löschen"
                    icon={<IconDelete />}
                    onClick={() => {
                        // const confirmationDialog = {
                        //     open: true,
                        //     confirmAction: function() {
                        //         benefitsStore.deleteCampaign(id)
                        //     }
                        // }
                        this.setState({
                            confirmationDialogOpen: true,
                            confirmationDialogAction: () => {
                                benefitsStore.deleteCampaign(id)
                            },
                            confirmationDialogContent: 'TestContent'
                        })
                        console.log('true!')
                    }}
                />
            </Paper>
        )
    }

    renderConfirmationDialog() {
        return (
            <Dialog
                // title={this.state.confirmationDialogTitle}
                actions={[
                    <RaisedButton
                        label={'Abbrechen'}
                        onClick={() => {
                            // this.setState({
                            //     confirmationDialog: {open: false}
                            // })
                        }}
                    />,
                    <RaisedButton
                        label={'Ja'}
                        // onClick={() => this.state.confirmationDialogAction}
                    />
                ]}
                modal={true}
                open={this.state.confirmationDialogOpen}
            />



            // </Dialog>
        )
         /*
            this.state.confirmationDialogContent
            */
    }

    render() {
        const {
            benefits: benefitsStore,
            match: {params: {id}}
        } = this.props
        console.log(id, this.props)

        const benefit       = benefitsStore.data[id]
        let hasCampaign
        try {
            hasCampaign   = benefit.campaign
                         && benefit.campaign.campaignId != null
        }
        catch (err) {
            hasCampaign = false
            console.warn(err)
        }

        window.benefitTest = benefit

        return (
            <div id="campaigns">
                {this.renderConfirmationDialog()}

                <h3>
                    {!hasCampaign
                        ? 'Noch keine Kampagne vorhanden'
                        : 'zugehörige Kampagne:'
                    }
                </h3>
                {!hasCampaign &&
                <RaisedButton
                    label={'Campaign anlegen'}
                    onClick={() => {
                        benefitsStore.createCampaign(id)
                        this.props.toggleEditMode()
                    }}
                />}
                {hasCampaign &&
                <div id="campaignData">
                    {this.renderCampaignFields()}
                    <br />
                    {/* <RaisedButton
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
                    /><br /> */}
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
