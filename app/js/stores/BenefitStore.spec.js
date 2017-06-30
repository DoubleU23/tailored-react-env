'use strict'

import {expect}      from 'chai'
import BenefitsStore from './BenefitsStore'

/* global describe, it */
describe('[SPEC] BenefitsStore', function() {
    it('should fetch data', async function(done) {
        try {
            const benefitsStore = new BenefitsStore()

            const benefits      = await benefitsStore.fetch()
            console.log('benefits.length', benefits.length)

            expect(benefits.length).to.not.equal(0)


            // expect(1).to.not.equal(0)
            done()
        }
        catch (err) {
            done(err)
        }
    })
})
