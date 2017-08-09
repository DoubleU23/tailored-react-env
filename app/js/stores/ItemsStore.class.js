'use strict'

import axiosWrapped from '../../../utils/axiosWrapped'

import {
    extendObservable,
    action,
    toJS
}                   from 'mobx'

import fixtures     from '../../../stack/server/api/fixtures/'

import appConfig    from '../../../config/appConfig'

const {
    api: {
        base:       apiBase,
        endpoints:  {
            items:   itemsEndpoint
        }
    }
} = appConfig

// TBD: ErrorHandling
export default class ItemsStore {

    constructor(state = {}) {
        extendObservable(this, {
            status:     'inactive',
            error:      false,
            data:       {},
            fetched:    false // false || timestamp
        }, state)

        if (process.env.IS_BROWSER && process.env.DEBUG) {
            // expose to window
            window.itemsStore = this
        }
    }

    prepareData(data) {
        const dataSorted = {}
        data.forEach(item => {
            const id                = item.id

            dataSorted[id]          = item
            // dataSorted[id].patched  = Date.now()

            // refactor: may be not needed
            if (typeof dataSorted[id].subObject !== 'object') {
                dataSorted[id].subObject = {}
            }

            // feel free to do some other stuff here,
            // like preParsing or filtering data
        })

        return dataSorted
    }

    @action.bound
    patch(id, itemObj) {
        this.data[id]           = extendObservable(
            this.data[id],
            // you can't extend by observables
            toJS(itemObj)
        )
        this.data[id].patched   = Date.now()

        return this.data[id]
    }

    @action.bound
    async fetch() {
        this.status         = 'loading'
        this.error          = false

        let response
        const itemsUrl      = apiBase + itemsEndpoint
        if (process.env.BUILD_STATIC) {
            response = {
                status: 200,
                data:   fixtures.items
            }
        }
        else {
            response      = await axiosWrapped('get', itemsUrl, {
                responseType: 'json',
                auth: {
                    username: 'admin',
                    password: 'admin'
                }
            })
        }

        if (response instanceof Error) {
            this.error = response
            this.status = 'error'

            console.log('[ItemsStore.catch(err)]', this.error)
            // TBD: handle Network Error
            // use {APIError} from Exceptions
            return response
        }

        if (response && response.status === 200) {
            this.data    = this.prepareData(response.data)
            this.status  = 'success'
            this.fetched = Date.now()

            return response.data
        }
        else {
            // refactor: you should not get here
            // if you see this error => refactor
            let error = new Error(
                'Could not fetch ' + itemsUrl + '\n'
            +   'StatusCode: response.status'
            )
            // refactor: return or throw here!? oO
            // depends, where/how we handle the errors
            return error
        }
    }

    @action.bound
    createSubObject(itemId) {
        const item = this.data[itemId]
        extendObservable(item, {
            subObject: {
                id:             itemId,
                description:    'I am fresh out of the press.',
                dueDate:        '2018-09-28T10:04:00.000Z',
                fromDate:       '2017-07-01T10:04:00.000Z',
                name:           'generiertes subObject',
                type:           1
            }
        })
    }

    @action.bound
    async deleteSubObject(id) {
        // delete locally
        this.data[id].subObject  = {}
        this.data[id].patched    = Date.now()

        return true
    }

}
