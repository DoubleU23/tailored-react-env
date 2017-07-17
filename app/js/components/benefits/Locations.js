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

import IconDelete         from 'material-ui/svg-icons/action/delete-forever'
import IconButton         from 'material-ui/IconButton'
import FlatButton         from 'material-ui/FlatButton'
import Paper              from 'material-ui/Paper'

@inject('benefits', 'messages')
@observer
export default class Locations extends Component {

    static propTypes = {
        benefits:   PropTypes.object.isRequired,
        // custom
        campaign:   PropTypes.object.isRequired,
        id:         PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired
    }

    render() {
        const {
            id:         benefitCode,
            benefits:   benefitsStore
        } = this.props
        const hasLocation = this.props.campaign.locations instanceof Array
                         && this.props.campaign.locations.length

        return (
            <div id="locations">
                <h3>
                    Locations:
                    <a  href="#"
                        onClick={() => {}}
                    >
                        hinzufügen
                    </a>
                </h3>
                {hasLocation &&
                this.props.campaign.locations.map(location => {
                    return (
                        <Paper
                            className="locationPaper"
                            zDepth={3}
                            style={{
                                padding: '1.5rem 1rem',
                                margin: '0 10px 20px',
                                display: 'inline-block'
                            }}
                        >
                            <IconButton
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
                })}
            </div>
        )
    }

}
