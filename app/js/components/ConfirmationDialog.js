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

@inject('view', 'messages')
@observer
export default class ConfirmationDialog extends Component {

    static propTypes = {
        messages:           PropTypes.object.isRequired,
        view:               PropTypes.object.isRequired
    };

    // constructor(props) {
    //     super(props)
    // }

    closeConfirmationDialog() {
        this.props.view.confirmationDialog.open = false
    }

    render() {
        const {view: {confirmationDialog: {
            open, action, title, content
        }}} = this.props

        const closeConfirmationDialog = this.closeConfirmationDialog.bind(this)

        return (
            <Dialog
                open={open}
                modal={true}

                onRequestClose={closeConfirmationDialog}
                actions={[
                    <FlatButton
                        style={{margin: '0 1rem 1rem 0'}}
                        backgroundColor="#666"
                        hoverColor="#999"
                        label={'Abbrechen'}
                        onClick={closeConfirmationDialog}
                    />,
                    <FlatButton
                        backgroundColor="#666"
                        hoverColor="#999"
                        label={'Ja'}
                        onClick={action}
                    />
                ]}
                title={title}
            >
                {content}
            </Dialog>
        )
    }

}
