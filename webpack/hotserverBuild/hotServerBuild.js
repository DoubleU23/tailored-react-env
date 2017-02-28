import express          from 'express'
import webpack          from 'webpack'
import webpackDev       from 'webpack-dev-middleware'
import webpackHot       from 'webpack-hot-middleware'

import webpackGetConfig from '../webpackGetConfig'

const app           = express()

const webpackConfig = webpackGetConfig(true)
const compiler      = webpack(webpackConfig)

app.use(webpackDev(compiler, {
  noInfo:     true,
  publicPath: webpackConfig.output.publicPath
}))

app.use(webpackHot(compiler))

app.listen(webpackConfig.hotPort, () => {
  console.log('Hot server started at port %d', webpackConfig.hotPort) // eslint-disable-line no-console
})
