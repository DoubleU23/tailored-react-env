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
import Paper              from 'material-ui/Paper'

@inject('benefits', 'messages')
@observer
export default class Locations extends Component {

    static propTypes = {
        campaign: PropTypes.object.isRequired
        // custom
    }

    render() {
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
                            <a
                                onClick={() => this.deleteLocation(location.id)}
                                href="#"
                                className="locationPaperDelete"
                            >x</a>
                            #{location.id} - {location.name}<br />
                            {location.address}
                        </Paper>
                    )
                })}
            </div>
        )
    }

}
