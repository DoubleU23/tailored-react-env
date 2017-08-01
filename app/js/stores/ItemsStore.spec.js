'use strict'

import {expect}     from 'chai'

import moxios       from 'moxios'
import ItemsStore   from './ItemsStore.class'
import fixtures     from '../../../stack/server/api/fixtures/'

import appConfig    from '../../../config/appConfig'

const {
    api:        {base: apiBase, endpoints: {items: itemsEndpoint}},
    timings:    {timeout}
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
            response:   fixtures.items
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
        const [testItem]    = fixtures.items
        expect(itemStore.data[testItem.id].id).to.equal(testItem.id)
    })
})
