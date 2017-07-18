'use strict'

import React              from 'react'
import PropTypes          from 'prop-types'
import Component          from 'react-pure-render/component'
import {observer, inject} from 'mobx-react'

// import { Redirect }    from 'react-router'
import {
    observable,
    extendObservable,
    action,
    computed
}                         from 'mobx'

import RaisedButton       from 'material-ui/RaisedButton'
import FlatButton         from 'material-ui/FlatButton'
import IconButton         from 'material-ui/IconButton'
import FontIcon           from 'material-ui/FontIcon'
import Paper              from 'material-ui/Paper'
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

    static newLocation = {
        name:       'sdgg',
        address:    'shsh'
    };

    constructor(props) {
        super(props)

        const {benefits: benefitsStore, id} = props
        const campaign      = benefitsStore.data[id].campaign

        const hasLocations  = campaign.locations instanceof Array
        const newKey        = hasLocations ? campaign.locations.length : 0

        this.state = {
            addLocationOpen:    false,
            hasLocations:       hasLocations,
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
            messages:   {fields: {benefits: {campaign: {locations: msg}}}}
        } = this.props

        const benefit       = benefitsStore.data[benefitCode]
        let {
            campaign,
            campaign: {locations}
        }                   = benefit,
            hasLocations    = this.state.hasLocations


        // console.log(campaign, locations, newKey)
        // console.log(this.state.newLocation)

        return (
            <div id="locations">
                <h3>Locations:</h3>
                {hasLocations &&
                campaign.locations.map(location => {
                    if (!location.id) {
                        return ''
                    }
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
                                tooltip={'Location löschen'}
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
                || 'Noch keine Location hinzufügt'}
                <br />
                <br />
                <FlatButton
                    backgroundColor="#666"
                    hoverColor="#999"
                    label="Location hinzufügen"
                    icon={<IconDelete />}
                    onClick={() => {
                        this.setState({addLocationOpen: true})
                    }}
                />
                <Dialog
                    title="Add new Location"
                    open={this.state.addLocationOpen}
                    onRequestClose={this.toggleAddModal.bind(this)}
                >
                    <div id="addLocationWrapper">
                        {['name', 'address'].map(fieldName => {
                            return (
                                <div key={'locationAddNewField_' + fieldName}>
                                    <span className="fieldName">
                                        {msg[fieldName]}
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
                            label="Hinzufügen"
                            icon={<IconCreate />}
                            onClick={() => {
                                benefitsStore.addLocation({
                                    benefitCode,
                                    newLocation:    this.state.newLocation
                                })
                                this.setState({
                                    hasLocations:    true,
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
                            label="Abbrechen"
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
            </div>
        )
    }

}
