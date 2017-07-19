'use strict'

import {
    extendObservable,
    action
} from 'mobx'

const noopFn = () => {}

export default class ViewStore {

    constructor(state = {}) {
        extendObservable(this, {
            status:             'inactive',
            error:              false,
            _confirmationDialog: {
                open:       false,
                action:     noopFn,
                title:      'Sind Sie sicher?',
                content:    'Wollen Sie die Kampagne wirklich löschen?'
            }
        }, state)

        if (process.env.IS_BROWSER && process.env.DEBUG) {
            window.ViewStore = this
        }
    }

    set confirmationDialog(confirmationDialog) {
        extendObservable(this._confirmationDialog, confirmationDialog)
    }

    get confirmationDialog() {
        console.log('confirmationDialog getter called!')
        return this._confirmationDialog
    }

}
