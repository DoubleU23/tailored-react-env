let sum = require('./sum.js').default

let test = require('../../gulp/util/script-filter.js')

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
