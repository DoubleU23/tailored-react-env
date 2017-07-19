'use strict'

import {expect}   from 'chai'

import moxios     from 'moxios'
import ItemsStore from './ItemsStore.class'

import appConfig  from '../../../config/appConfig'

const {
    api: {base: apiBase, endpoints: {items: itemsEndpoint}},
    timings: {timeout}
} = appConfig

/* global describe, it, beforeEach, afterEach */
describe('[SPEC] ItemsStore', async function() {
    // PRESET
    this.timeout(timeout * 3)

    beforeEach(function() {
    //  import and pass your custom axios instance to this method
        moxios.install()
        moxios.stubRequest(itemsUrl, {
            status: 200,
            responseText: 'hello'
        })
    })

    afterEach(function() {
    //  import and pass your custom axios instance to this method
        moxios.uninstall()
    })

    // SETUP
    const itemsUrl          = apiBase + itemsEndpoint

    it('ASYNC - should fetch data',  async function() {
        const benefitsStore = new ItemsStore()
        const response      = await benefitsStore.fetch()

        if (response.error) {
            // response is an error
            // "throw response" === done(repsonse)
            throw response
        }

        expect(response).to.equal('hello')
        expect(benefitsStore.error).to.equal(false)
    })

    // it('SYNC - should fetch data', function(done) {
    //     const benefitsStore = new ItemsStore()
    //     benefitsStore.fetch()
    //         .then(response => {
    //              if (response.error) {
    //          //  Network Error or TimeoutError
    //              done(response)
    //              }
    //
    //             expect(response).to.equal('hello')
    //             expect(benefitsStore.error).to.equal(false)
    //             done()
    //         })
    //         .catch(mostLikelyAssertionError => {
    //             done(mostLikelyAssertionError)
    //         })
    // })
})
