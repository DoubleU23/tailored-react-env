import React          from 'react'
import ReactDOMServer from 'react-dom/server'

import Html           from './Html.react'
import ip             from 'ip'

import config    from '../../config/config.js'

const {portHMR} = config

export default function render(req, res, next) {
    res.send(renderPage())
}

const serverIp = ip.address()

const scriptSrc = process.env.APP_ENV === 'development'
    ? `http://${serverIp}:${portHMR}/build/app.js`
    : '/build/app.js?notreadytouse'

function renderPage() {
  return '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
    <html>
      <head>
      </head>
      <body>
        <div id="app"></div>
        <script type="text/javascript" src={scriptSrc}></script>
      </body>
    </html>
  )
}

// function renderPage() {
//  return '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
//    <Html
//      appCssFilename={appCssFilename}
//      bodyHtml={`<div id="app">${appHtml}</div>${scriptHtml}`}
//      googleAnalyticsId={config.googleAnalyticsId}
//      helmet={Helmet.rewind()}
//      isProduction={config.isProduction}
//    />
//  )
// }
