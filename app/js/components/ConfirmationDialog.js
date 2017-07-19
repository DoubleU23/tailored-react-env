'use strict'

import React              from 'react'
import PropTypes          from 'prop-types'
import Component          from 'react-pure-render/component'
import {observer, inject} from 'mobx-react'

import RaisedButton       from 'material-ui/RaisedButton'
import Dialog             from 'material-ui/Dialog'

@inject('view', 'messages')
@observer
export default class ConfirmationDialog extends Component {

    static propTypes = {
        messages:           PropTypes.object.isRequired,
        view:               PropTypes.object.isRequired
    };

    closeConfirmationDialog() {
        this.props.view.confirmationDialog.open = false
    }

    render() {
        console.log(this.props.view.confirmationDialog)
        const {
            messages:   {ui: {confirmationDialog: msg}},
            view:       {confirmationDialog: {
                open, action, title, content,
                buttonLabels: {
                    confirm:    labelConfirm,
                    cancel:     labelCancel
                }
            }}
        } = this.props

        const closeConfirmationDialog = this.closeConfirmationDialog.bind(this)

        return (
            <Dialog
                open={open}
                modal={true}
                onRequestClose={closeConfirmationDialog}
                actions={[
                    <RaisedButton // CANCEL
                        label={labelCancel != null ? labelCancel : msg.cancel}
                        style={{margin: '0 1rem 1rem 0'}}
                        backgroundColor="#666"
                        hoverColor="#999"
                        onClick={closeConfirmationDialog}
                    />,
                    <RaisedButton // CONFIRM
                        label={labelConfirm != null ? labelConfirm : msg.confirm}
                        backgroundColor="#666"
                        hoverColor="#999"
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
