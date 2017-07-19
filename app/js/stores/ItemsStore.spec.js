'use strict'

import {expect}     from 'chai'

import moxios       from 'moxios'
import ItemsStore   from './ItemsStore.class'
import testResponse from '../../../stack/server/api/items'

import appConfig    from '../../../config/appConfig'

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
            status:     200,
            response:   testResponse
        })
    })

    afterEach(function() {
    //  import and pass your custom axios instance to this method
        moxios.uninstall()
    })

    // SETUP
    const itemsUrl  = apiBase + itemsEndpoint
    const itemStore = new ItemsStore()

    it('ASYNC - should fetch data',  async function() {
        const response  = await itemStore.fetch()
        expect(itemStore.status).to.equal('success')
        expect(response instanceof Error).to.equal(false)

        expect(itemStore.data instanceof Object).to.equal(true)
    })

    it('ASYNC - should have sorted data after fetching',  function() {
        const [testItem]    = testResponse
        expect(itemStore.data[testItem.id].id).to.equal(testItem.id)
    })

    // it('SYNC - should fetch data', function(done) {
    //     const itemStore = new ItemsStore()
    //     itemStore.fetch()
    //         .then(response => {
    //              if (response.error) {
    //          //  Network Error or TimeoutError
    //              done(response)
    //              }
    //
    //             expect(response).to.equal('hello')
    //             expect(itemStore.error).to.equal(false)
    //             done()
    //         })
    //         .catch(mostLikelyAssertionError => {
    //             done(mostLikelyAssertionError)
    //         })
    // })
})
