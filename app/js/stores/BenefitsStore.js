import Promise from 'bluebird'
import axios          from 'axios'
import axiosWrapped   from '../../../utils/axiosWrapped'

import {TimeoutError} from '../../../utils/Exceptions'


import {
    observable,
    extendObservable,
    action
} from 'mobx'

import appConfig from '../../../config/appConfig'

const {
    api: {base: apiBase, endpoints: {benefits: benefitsEndpoint}}
} = appConfig

export default class BenefitsStore {

    constructor(state = {}) {
        extendObservable(this, {
            foo:        'bar',
            bar:        'foo',
            status:     'inactive',
            error:      false,
            data:       observable([]),
            fetched:    false // false || timestamp
        }, state)
    }

    @action
    async fetch() {
        const benefitsUrl   = apiBase + benefitsEndpoint
        const testUrl       = 'http://localhost:8000/test/testTimeout'

        this.status = 'pending'
        this.error  = false

        const response = await axiosWrapped('get', benefitsUrl, {
            responseType: 'json'
        })

        console.log('BenefitsStore isError?', [response.error])
        console.log('BenefitsStore response', [response])
        console.log('BenefitsStore response.message', [response.message])

        if (response.error) {
            this.error = response.error
            this.status = 'error'
            // timeoutError !?
            console.log('[BenefitsStore.catch(err)]', this.error)
            if (this.error instanceof TimeoutError) {
                // special handling of TimeoutError?
            }
            // refactor: return or throw here!?
            // return response
            return response
        }

        if (response && response.status === 200) {
            // simulate server delay
            setTimeout(() => {
                this.data    = response.data
                this.status  = 'success'
                this.fetched = Date.now()
            }, 1000)

            // return Promise.resolve(response.data)
            return response.data
        }
        else {
            // refactor: you should not get here
            // if you see this error => refactor

            let error = new Error(
                'Could not fetch ' + benefitsUrl + '\n'
            +   'StatusCode: response.status'
            )
            // refactor: return or throw here!? oO
            // depends, where/how we handle the errors

            return error

            // return Promise.reject(error)

            // throw new Error(
            //     'Could not fetch ' + apiBase + benefitsEndpoint + '\n'
            // +   'StatusCode: response.status'
            // )
        }
    }

    get foo() {
        return this.foo
    }

    set foo(value) {
        this.foo = value
        return true
    }

}
