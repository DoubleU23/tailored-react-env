'use strict'

import Promise from 'bluebird'
import axios          from 'axios'
import axiosWrapped   from '../../../utils/axiosWrapped'

// import nock          from 'nock'
// import fetchMock     from 'fetch-mock'
import moxios        from 'moxios'


import {expect}      from 'chai'
import BenefitsStore from './BenefitsStore'

import appConfig from '../../../config/appConfig'

const {
    api: {base: apiBase, endpoints: {benefits: benefitsEndpoint}},
    timings: {timeout}
} = appConfig

/* global describe, it, beforeEach, afterEach */
describe('[SPEC] BenefitsStore', async function() {
    // PRESET
    this.timeout(timeout * 3)

    beforeEach(function() {
    //  import and pass your custom axios instance to this method
        moxios.install()
        moxios.stubRequest(benefitsUrl, {
            status: 200,
            responseText: 'hello'
        })
    })

    afterEach(function() {
    //  import and pass your custom axios instance to this method
        moxios.uninstall()
    })

    // SETUP
    const benefitsUrl   = apiBase + benefitsEndpoint

    it('ASYNC - should fetch data',  async function() {
        const benefitsStore = new BenefitsStore()
        const response      = await benefitsStore.fetch()

        // refactor: catch erroring request here!?!?!?
        // would be Network Error or TimeoutError
        if (response.error) {
            // response is an error
            // "throw response" === done(repsonse)
            throw response
        }

        expect(response).to.equal('hello')
        expect(benefitsStore.error).to.equal(false)

        expect(response).to.equal('test')
    })

    // it('SYNC - should fetch data', function(done) {
    //     const benefitsStore = new BenefitsStore()
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
