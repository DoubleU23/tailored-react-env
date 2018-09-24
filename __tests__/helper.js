'use strict'

import {expect as chaiExpect} from 'chai'
// import sinon from 'sinon'

console.log('helper.js called!')

global.expect = chaiExpect

// beforeEach(function() {
//     global.sandbox = sinon.sandbox.create()
//     global.expect = chaiExpect
// })

// afterEach(function() {
//     global.sandbox.restore()
// })

