// let sum = require('./sum.js').default

import sum from './sum.js'
import scriptFilter from '../../gulp/util/script-filter.helper.js'

import testComponent from '../../app/js/components/Footer.js'
import CurrentUserActions from '../../app/js/actions/CurrentUserActions.js'
// let test = require('../../gulp/util/script-filter.js')

describe('"firstTest.test.js"', function() {
    it('adds 1 + 2 to equal 3', function() {
        expect(sum(1, 2)).to.equal(3)
    })
    // it('use second if-branch (c === "test")', function() {
    //     expect(sum(1, 2, 'test')).to.equal(1)
    // })
    it('returnValue of sum should be a "number"', function() {
        expect(sum(1, 2)).to.be.a('number')
    })
})
