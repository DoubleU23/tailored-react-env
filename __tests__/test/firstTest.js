let sum = require('./sum.js').default

describe('"firstTest.js"', function() {
    it('adds 1 + 2 to equal 3', function() {
        expect(sum(1, 2)).to.equal(3)
    })
    it('use second if-branch (c === "test")', function() {
        expect(sum(1, 2, 'test')).to.equal(1)
    })
    it('returnValue of sum should be a "number"', function() {
        expect(sum(1, 2)).to.be.a('number')
    })
})
