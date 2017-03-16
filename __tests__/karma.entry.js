//  ___   ___    _  _  ___ _____   _____ ___  _   _  ___ _  _   _
// |   \ / _ \  | \| |/ _ \_   _| |_   _/ _ \| | | |/ __| || | | |
// | |) | (_) | | .` | (_) || |     | || (_) | |_| | (__| __ | |_|
// |___/ \___/  |_|\_|\___/ |_|     |_| \___/ \___/ \___|_||_| (_)
//
// BLACK MAGIC - JUST WORKS!
// ALL CONFIG FOR THIS IS BASED IN "/config/karma.config.js"

/**
 * INJECTING TESTING LIBS/FRAMEWORKS
 * expose testing utils and assertion functions to global scope
 *
 *     (MOCHA gets injected by karma-mocha from karma.config->frameworks)
 *
 *     -) CHAI - assertion libary for mocha - with:
 *         chaiEnzyme - extends chai assertions (for rendered components)
 *         chaiAsPromised - enables 'chai.should' to receive and await promise-values
 *
 *     -) ENZYME - render tools for React Component Testing
 *
 *     -) CHEERIO - not used yet (we'll may need it later)
 */
import {mount, render, shallow} from 'enzyme'
// import cheerio               from 'cheerio'
import chai                     from 'chai'
import chaiAsPromised           from 'chai-as-promised'
import chaiEnzyme               from 'chai-enzyme'

chai.use(chaiAsPromised)
chai.use(chaiEnzyme())

// globalize them all!
global = Object.assign(global,
    // {cheerio},
    {mount, render, shallow},                           // enzyme render functions
    {chai, expect: chai.expect, should: chai.should()}  // chai assertion functions
)

/**
 * LOAD FILES
 *     according to https://github.com/webpack-contrib/istanbul-instrumenter-loader#testindexjs
 *
 *     1. CONTEXT_COVERAGE
 *         import all src files to cover them per webpack preLoader "isparta-instrumenter"
 *
 *     2. CONTEXT_TESTS
 *         import all test files and simply execute them (with injected mocha)
 *
 * fyi: "require.context" gets new params injected by "webpack.ContextReplacementPlugin" in karma.config.js
 */

// CONTEXT_COVERAGE
const coverageContextRequire    = require.context('CONTEXT_COVERAGE')
const coverageFiles             = coverageContextRequire.keys()
coverageFiles.forEach(coverageContextRequire)

// CONTEXT_TESTS
const testContextRequire        = require.context('CONTEXT_TESTS')
const testFiles                 = testContextRequire.keys()
testFiles.forEach(testContextRequire)

// DRY version is broken :(
// => Error: "require function is used in a way in which dependencies cannot be statically extracted"
//
// ;['CONTEXT_COVERAGE', 'CONTEXT_TESTS'].forEach(v => {
//     const contextRequire    = require.context(v) // throws error :(
//     const fileList          = contextRequire.keys()
//     fileList.forEach(contextRequire)
// })
//
// refactor: try to use when upgraded to webpack2
