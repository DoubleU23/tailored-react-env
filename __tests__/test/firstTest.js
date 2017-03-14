// import sum from './sum.js'
'use strict'
let sum = require('./sum.js').default,
    yourmother = 'fuck',
    test = 'test'

if (test === 'test2') {
    yourmother = '???'
} else {
    describe('dsafdössg', function() {
        it('adds 1 + 2 to equal 3', () => {
            // if (yourmother !== 'fuck') {
            //     let test2 = 'test2'
            //     console.log('uncovered!')
            // }
            // // else if (yourmother === '???') {
            // //     console.log('uncovered 2!')
            // // }
            // else {
            // }
            sum(1, 2, 3)
            expect(sum(1, 2)).to.equal(3)
            expect(sum(1, 2, 'test')).to.equal(1)
        })
    })
}

