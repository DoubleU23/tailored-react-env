'use strict'

import {extendObservable} from 'mobx'

const confirmationDialogDefaults = {
    closeOnAction:  true,
    // refactor: name it "isOpen" (bool state var)
    open:           false,
    action:         null,
    title:          'Are you sure?',
    content:        'Do you REALLY want to do that?',
    canCancel:      true,
    buttonLabels:       {
        cancel:     null,
        confirm:    null
    }
}

export default class ViewStore {

    constructor(state = {}) {
        extendObservable(this, {
            status:             'inactive',
            error:              false,
            _confirmationDialog: {...confirmationDialogDefaults},
            sideBar: {
                isOpen: false
            },
            navBar:  {
                isOpen: true
            }
        }, state)

        if (process.env.IS_BROWSER && process.env.DEBUG) {
            window.ViewStore = this
        }
    }

    set confirmationDialog(confirmationDialog) {
        // extend given option with defaults
        confirmationDialog = Object.assign(confirmationDialogDefaults, confirmationDialog)

        // then extend the observable
        extendObservable(this._confirmationDialog, confirmationDialog)
    }

    get confirmationDialog() {
        return this._confirmationDialog
    }

}
