'use strict'

import React              from 'react'
import PropTypes          from 'prop-types'
import Component          from 'react-pure-render/component'
import {observer, inject} from 'mobx-react'

import FlatButton         from 'material-ui/FlatButton'
import Paper              from 'material-ui/Paper'
import IconButton         from 'material-ui/IconButton'
import IconDelete         from 'material-ui/svg-icons/action/delete-forever'
import IconCreate         from 'material-ui/svg-icons/content/create'
import Dialog             from 'material-ui/Dialog'

@inject('benefits', 'messages')
@observer
export default class Locations extends Component {

    static propTypes = {
        messages:   PropTypes.object.isRequired,
        benefits:   PropTypes.object.isRequired,
        // custom
        campaign:   PropTypes.object.isRequired,
        id:         PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired
    };

    constructor(props) {
        super(props)

        const {benefits: benefitsStore, id} = props
        const campaign      = benefitsStore.data[id].campaign

        const hasLocations  = campaign.locations instanceof Array
        const newKey        = hasLocations ? campaign.locations.length : 0

        this.state = {
            addLocationOpen:    false,
            newKey:             newKey,
            newLocation:        this.getEmptyLocation()
        }
    }

    getEmptyLocation() {
        return {
            name:       '',
            address:    ''
        }
    }

    toggleAddModal() {
        this.setState({
            addLocationOpen: !this.state.addLocationOpen
        })
    }

    render() {
        const {
            id:         benefitCode,
            benefits:   benefitsStore,
            messages:   {fields: {locations: msgFields}},
            messages:   {locations: msg}
        } = this.props

        // TBD: benefitsStore.getCampaign()
        let {campaign}      = benefitsStore.data[benefitCode]

        const hasLocations    = campaign.locations instanceof Array
                             && campaign.locations.length

        return (
            <div id="locations">
                <h3>Locations:</h3>
                {!hasLocations &&
                <div>{msg.noLocation}<br /><br /></div>}

                <Dialog // ADD NEW DIALOG
                    title={msg.addNewDialog.title}
                    open={this.state.addLocationOpen}
                    onRequestClose={this.toggleAddModal.bind(this)}
                >
                    <div id="addLocationWrapper">
                        {['name', 'address'].map(fieldName => {
                            return (
                                <div key={'locationAddNewField_' + fieldName}>
                                    <span className="fieldName">
                                        {msgFields[fieldName]}
                                    </span>
                                    <input
                                        key={'locationInput_' + fieldName}
                                        style={{width: '100%'}}
                                        type="textfield"
                                        value={this.state.newLocation[fieldName]}
                                        onChange={e => {
                                            let newValue    = e.currentTarget.value,
                                                newLocation = {...this.state.newLocation}

                                            newLocation[fieldName] = newValue
                                            this.setState({newLocation})
                                        }}
                                    />
                                </div>
                            )
                        })}
                        <FlatButton
                            key={'locationInputAdd'}
                            style={{margin: '1.5rem 1rem 1rem 0'}}
                            backgroundColor="#666"
                            hoverColor="#999"
                            label={msg.addNewDialog.addNew}
                            icon={<IconCreate />}
                            onClick={() => {
                                benefitsStore.addLocation({
                                    benefitCode,
                                    newLocation:    this.state.newLocation
                                })
                                this.setState({
                                    newKey:          this.state.newKey + 1,
                                    newLocation:     this.getEmptyLocation(),
                                    addLocationOpen: false
                                })
                            }}
                        />
                        <FlatButton
                            key={'locationInputCancel'}
                            backgroundColor="#666"
                            hoverColor="#999"
                            label={msg.addNewDialog.cancel}
                            icon={<IconDelete />}
                            onClick={() => {
                                this.setState({
                                    newLocation:     this.getEmptyLocation(),
                                    addLocationOpen: false
                                })
                            }}
                        />
                    </div>
                </Dialog>


                {// LIST OF LOCATIONS
                hasLocations ?
                campaign.locations.map(location => {
                    return (
                        <Paper
                            key={'locationPaper_' + location.id}
                            className="locationPaper"
                            zDepth={3}
                            style={{
                                padding: '1.5rem 1rem',
                                margin: '0 10px 20px',
                                display: 'inline-block'
                            }}
                        >
                            <IconButton
                                key={'locationDeleteButton_' + location.id}
                                className="locationPaperDelete"
                                tooltip={msg.delete}
                                tooltipPosition="top-right"
                                onClick={() => {
                                    benefitsStore.deleteLocation({
                                        benefitCode,
                                        locationId: location.id
                                    })
                                }}
                            >
                                <IconDelete />
                            </IconButton>
                            #{location.id} - {location.name}<br />
                            {location.address}
                        </Paper>
                    )
                })
                : <span />}

                <br />
                <FlatButton // ADD NEW BUTTON
                    backgroundColor="#666"
                    hoverColor="#999"
                    label={msg.addNew}
                    icon={<IconDelete />}
                    onClick={() => {
                        this.setState({addLocationOpen: true})
                    }}
                />
            </div>
        )
    }

}
