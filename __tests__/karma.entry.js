const testContext = require.context('../app/js', true, /^((?!index).)*(\.js)+$/igm)
testContext.keys().forEach(testContext)

const testFiles = require.context('./test/', true, /\.test\.js$/igm)
testFiles.keys().forEach(testFiles)

// require('./test/firstTest.test.js')

// require('./components/Footer.test.js')
