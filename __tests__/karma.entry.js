// process.env.NODE_ENV = 'test'

// import appConfig from '../config/appConfig'
// import config from 'config'

// // code coverage
console.log('appConfig = ', process.env.APP_CONFIG) // , JSON.parse(process.env.APP_CONFIG)
// console.log('ROOT = ', process.env.APP_CONFIG.paths.ROOT)

// injected by webpack in karma.config.js
// const appConfig = JSON.parse(process.env.APP_CONFIG)
const {
    paths
} = process.env.APP_CONFIG

// cover all files in app/js
// dynamic require.context url throws errors:
//  "require function is used in a way in which dependencies cannot be statically extracted"
// try to use "https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin"

console.log('srcPath = ', process.env.COVERAGE_PATH) // ../app/js
const regExp = new RegExp(process.env.COVERAGE_PATTERN)
console.log(regExp)
const testContext = require.context(process.env.COVERAGE_PATH, true, /^((?!index).)*(\.js)+$/igm)
// tbd: refactor: try to outsource this into karma.config
// just pass the keys per process env (stringified array) and require it HERE!
console.log('testContext', testContext, testContext.keys())
const outsourced = testContext.keys() // <= should come from process env (stringified array)
outsourced.forEach(testContext)

const testFiles = require.context('./test/', true, /\.test\.js$/igm)
testFiles.keys().forEach(testFiles)

// require('./test/firstTest.test.js')

require('./components/Footer.test.js')
require('./components/Header.test.js')
