import express          from 'express'
import webpack          from 'webpack'
import webpackDev       from 'webpack-dev-middleware'
import webpackHot       from 'webpack-hot-middleware'

import webpackGetConfig from '../webpackGetConfig'

export default function startDevServer(cb) {
    const app                = express()

    const webpackConfig      = webpackGetConfig(true)
    const compiler           = webpack(webpackConfig)

    const webpackDevInstance = webpackDev(compiler, {
        noInfo:     true,
        publicPath: webpackConfig.output.publicPath
    })

    app.use(webpackDevInstance)

    app.use(webpackHot(compiler))

    app.listen(webpackConfig.hotPort, () => {
        console.log('Hot server started at port %d', webpackConfig.hotPort) // eslint-disable-line no-console
    })

    webpackDevInstance.waitUntilValid(() => {
        cb()
    })
}
