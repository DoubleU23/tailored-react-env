import {expect as chaiExpect} from 'chai'
// import sinon from 'sinon'
require('mocha')

console.log('setup.js called!')

global.expect = chaiExpect

beforeEach(() => {
    console.log('setup.beforeEach')
})
