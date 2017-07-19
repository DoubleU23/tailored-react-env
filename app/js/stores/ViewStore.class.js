'use strict'

import {extendObservable} from 'mobx'

const noopFn = () => {}

export default class ViewStore {

    constructor(state = {}) {
        extendObservable(this, {
            status:             'inactive',
            error:              false,
            _confirmationDialog: {
                open:           false,
                action:         noopFn,
                title:          'Sind Sie sicher?',
                content:        'Wollen Sie die Kampagne wirklich löschen?',
                buttonLabels:   {
                    cancel:     null,
                    confirm:    null
                }
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
        return this._confirmationDialog
    }

}
