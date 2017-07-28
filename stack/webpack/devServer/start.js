import express          from 'express'
import webpack          from 'webpack'
import webpackDev       from 'webpack-dev-middleware'
import webpackHot       from 'webpack-hot-middleware'

import webpackGetConfig from '../webpackGetConfig'

import appConfig from '../../../config/appConfig'

const {
    ports: {portHMR}
} = appConfig

export default function startDevServer(callback) {
    const app                = express()

    const webpackConfig      = webpackGetConfig(true)
    const compiler           = webpack(webpackConfig)

    const webpackDevInstance = webpackDev(compiler, {
        publicPath: webpackConfig.output.publicPath,
        noInfo:     true,
        colors:     true,
        headers:    {'Access-Control-Allow-Origin': '*'}
    })

    app.use(webpackDevInstance)

    app.use(webpackHot(compiler))

    app.listen(portHMR, () => {
        console.log('Hot server started at port %d', portHMR) // eslint-disable-line no-console
    })

    webpackDevInstance.waitUntilValid(() => {
        if (typeof callback === 'function') {
            callback()
        }
    })
}
