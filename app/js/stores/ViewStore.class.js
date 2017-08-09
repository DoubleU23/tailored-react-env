'use strict'

import {extendObservable} from 'mobx'

const confirmationDialogDefaults = {
    closeOnAction:  true,
    open:           false,
    action:         null,
    title:          'Are you sure?',
    content:        'Do you REALLY want to do that?',
    canCancel:      true,
    buttonLabels:   {
        cancel:     null,
        confirm:    null
    }
}

export default class ViewStore {

    constructor(state = {}) {
        extendObservable(this, {
            status:             'inactive',
            error:              false,
            _confirmationDialog: {...confirmationDialogDefaults}
        }, state)

        if (process.env.IS_BROWSER && process.env.DEBUG) {
            window.ViewStore = this
        }
    }

    set confirmationDialog(confirmationDialog) {
        // extend given option with defaults
        console.log('set confirmationDialog', confirmationDialog)
        confirmationDialog = Object.assign(confirmationDialogDefaults, confirmationDialog)

        console.log('set confirmationDialog', confirmationDialog)
        // then extend the observable
        extendObservable(this._confirmationDialog, confirmationDialog)
    }

    get confirmationDialog() {
        return this._confirmationDialog
    }

}
