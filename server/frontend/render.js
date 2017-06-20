import React                     from 'react'
import ReactDOMServer            from 'react-dom/server'
// import Html                   from './Html.react'
import ip                        from 'ip'

import getAppAssetFilenamesAsync from './getAssetPaths'
import appConfig                 from '../../config/appConfig.js'

const {
    isDevelopment,
    ports
} = appConfig

const serverIp  = ip.address()

const renderPageAsync = async () => {
    const {js: appJsFilename, css: appCssFilename} = await getAppAssetFilenamesCachedAsync()
    const scriptSrc = isDevelopment
        ? `http://${serverIp}:${ports.HMR}/build/app.js`
        : `/build/${appJsFilename}?notreadytouse`

    return '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
        <html>
            <head />
            <body>
                <div id="app" />
                <script type="text/javascript" src={scriptSrc} />
            </body>
        </html>
  )
}

export default async function render(req, res, next) {
    const html = await renderPageAsync()
    res.send(html)
}

// function renderPage() {
//  return '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
//    <Html
//      appCssFilename={appCssFilename}
//      bodyHtml={`<div id="app">${appHtml}</div>${scriptHtml}`}
//      googleAnalyticsId={appConfig.googleAnalyticsId}
//      helmet={Helmet.rewind()}
//      isProduction={appConfig.isProduction}
//    />
//  )
// }

let appAssetFilenameCache = null
const getAppAssetFilenamesCachedAsync = async () => {
    if (appAssetFilenameCache) return appAssetFilenameCache

    appAssetFilenameCache = await getAppAssetFilenamesAsync()

    return appAssetFilenameCache
}
