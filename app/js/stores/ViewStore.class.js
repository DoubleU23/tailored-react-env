'use strict'

import axiosWrapped   from '../../../utils/axiosWrapped'

import {
    observable,
    extendObservable,
    action,
    computed,
    toJS
} from 'mobx'

import appConfig from '../../../config/appConfig'


const noopFn = () => {}

// const {
// } = appConfig

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

        this.defineSubSetters('confirmationDialog')
    }

    // refactor: shove into npm package!
    defineSubSetters(objectKey) {
        const that              = this
        this[objectKey]         = {}
        const objectKeyReal     = '_' + objectKey
        const objectReal        = this[objectKeyReal]

        Object.keys(objectReal).forEach(propertyKey => {
            Object.defineProperty(this[objectKey], propertyKey, {
                get: function() {
                    if (process.env.DEBUG) {
                        console.log('[ViewStore->get objectKey.' + propertyKey + '] returns', that[objectKeyReal][propertyKey])
                    }
                    return that[objectKeyReal][propertyKey]
                },
                set: function(value) {
                    if (process.env.DEBUG) {
                        console.log('[ViewStore->set objectKey.' + propertyKey + '] value', value)
                    }
                    that[objectKeyReal][propertyKey] = value
                }
            })
        })
    }

    // set confirmationDialog(confirmationDialog) {
    //     console.log('confirmationDialog setter called!')
    //     extendObservable(this._confirmationDialog, {
    //         confirmationDialog
    //     })
    // }

    // get confirmationDialog() {
    //     return this._confirmationDialog
    // }

}
