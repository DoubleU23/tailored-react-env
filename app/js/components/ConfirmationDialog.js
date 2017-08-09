// Info for refactoring:
// noAction (or action == null)
//     => only close button

// canCancel
//     false => show only action
//         if !action => show cancel (overrule canCancel)

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

    // TBD: closeAction
    static propTypes = {
        messages:           PropTypes.object.isRequired,
        view:               PropTypes.object.isRequired
    };

    constructor(props) {
        super(props)

        this.noop = () => {}
        this.getAction                  = this.getAction.bind(this)
        this.closeConfirmationDialog    = this.closeConfirmationDialog.bind(this)
    }

    closeConfirmationDialog() {
        this.props.view.confirmationDialog.open = false
    }

    getAction() {
        const confirmationDialogOptions             = this.props.view.confirmationDialog
        let {action: originalAction, closeOnAction} = confirmationDialogOptions,
            myAction

        // refactor: canCancel
        // see also line 79
        if (originalAction === 'close' || originalAction == null) {
            myAction = this.closeConfirmationDialog
        }
        else {
            myAction = typeof originalAction === 'function'
                ? originalAction
                : this.noop
        }

        const action = !closeOnAction
            ? myAction
            : e => {
                console.log('action called')
                myAction(e, confirmationDialogOptions)
                this.closeConfirmationDialog()
            }

        return action.bind(this)
    }

    render() {
        console.log(this.props.view.confirmationDialog)
        let {
            messages:   {ui: {confirmationDialog: msg}},
            view:       {confirmationDialog: {
                canCancel, open, title, content, action: originalAction,
                // refactor: buttonLabels
                buttonLabels: {
                    confirm:    labelConfirm,
                    cancel:     labelCancel
                }
            }}
        } = this.props

        // always schow confirm button!
        const actions = [
            <RaisedButton // CONFIRM
                label={labelConfirm != null ? labelConfirm : msg.confirm}
                backgroundColor="#666"
                style={{margin: '0 1rem 1rem 0'}}
                hoverColor="#999"
                onClick={this.getAction()}
            />
        ]

        if (canCancel
        && !(originalAction === 'close' || originalAction == null)) {
            // add CANCEL button (if action != cancel)
            actions.push( // .unshift(
                <RaisedButton
                    label={labelCancel != null ? labelCancel : msg.cancel}
                    backgroundColor="#666"
                    hoverColor="#999"
                    onClick={this.closeConfirmationDialog}
                />
            )
        }

        return (
            <Dialog
                open={open}
                modal={true}
                onRequestClose={canCancel ? this.closeConfirmationDialog : this.noop}
                actions={actions}
                repositionOnUpdate={false}
                // ConfirmationDialog is always on top
                // (in case of multiple Dialogs)
                style={{zIndex: 9999}}
                overlayStyle={{zIndex: 999}}

                title={title}
            >
                {content}
            </Dialog>
        )
    }

}
