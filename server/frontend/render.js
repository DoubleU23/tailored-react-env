import React          from 'react'
import ReactDOMServer from 'react-dom/server'

// import Html        from './Html.react'
import ip             from 'ip'

import appConfig      from '../../config/appConfig.js'

const {
    isDevelopment,
    ports
} = appConfig

const serverIp  = ip.address()

const scriptSrc = isDevelopment
    ? `http://${serverIp}:${ports.HMR}/build/app.js`
    : '/build/app.js?notreadytouse'

const renderPage = () => {
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

export default function render(req, res, next) {
    res.send(renderPage())
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
