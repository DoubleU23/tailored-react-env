// REACT LIBS
import React                            from 'react'
import {renderToStaticMarkup}           from 'react-dom/server' // {renderToString}
// import Html                          from './Html.react'
// import {createMemoryHistory}            from 'history'


// import {matchPath, match, StaticRouter} from 'react-router-dom'
// import {matchPath, match} from 'react-router-server'


// OTHER LIBS
import ip                               from 'ip'
// refactor                            : use bluebird as polyfill on entrypoint(s)
import Promise                          from 'bluebird'
// APP FILES
// import getAppAssetFilenamesAsync        from './getAssetPaths'
import getAssetFilenamesAsync           from '../../static/getAssetFilenamesAsync'
import appConfig                        from '../../../config/appConfig.js'

// import initialState                     from '../../../app/js/stores/initialState.js'
// import store                            from '../../../app/js/stores/index.js'

// import routes                           from '../../../app/js/Routes.js'

// import App                              from '../../../app/js/App.js'
// import { Provider }                     from 'mobx-react'

const {
    isDevelopment,
    ports: {portHMR}
} = appConfig

const serverIp  = ip.address()

export default async function render(req, res, next) {
    const html = await renderPageAsync({url: req.url})
    res.send(html)
    return
}

// TBD: fetchComponentDataAsync
const fetchComponentDataAsync = async (dispatch, {components, location, params}) => { // eslint-disable-line space-before-function-paren
    // const fetchActions = components.reduce((actions, component) => {
    //     return actions.concat(component.fetchActions || [])
    // }, [])
    // const promises = fetchActions.map(action => dispatch(action(
    //     {location, params}
    // )))

    // // Because redux-promise-middleware always returns fulfilled promise, we have
    // // to detect errors manually.
    // // https://github.com/pburtchaell/redux-promise-middleware#usage
    // const results = await Promise.all(promises)
    // results.forEach(result => {
    //     if (result.error)
    //         throw result.payload
    // })
    return  Promise.resolve()
}

const renderPageAsync = async ({url}) => {
    const {js: appJsFilename, css: appCssFilename} = await getAssetFilenamesAsync()
    const scriptSrc = isDevelopment
        ? `http://${serverIp}:${portHMR}/build/app.js`
        : `/build/${appJsFilename}`

    const styleSrc  = `/build/${appCssFilename}`

    // refactor: use StaticRouter?
    //
    // as suggested by react router examples
    // https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/server-rendering.md
    // renders fine... but is absolutely static and doesn't react to anything
    //
    // workaround: take the Apps main wrapper as renderTarget for FE-rendering
    // => renders static on server... and when ready, render on client
    //
    // but that results in a react warning on client:
    /*
        warning.js:36 Warning: React attempted to reuse markup in a container but the checksum was invalid.
        This generally means that you are using server rendering and the markup generated on the server was not what the client was expecting.
        React injected new markup to compensate which works but you have lost many of the benefits of server rendering.
        Instead, figure out why the markup being generated is different on the client or server:
         (client) <div style="height:50
         (server) <header data-reactid=
    */

    // +++ also will try "https://www.npmjs.com/package/react-router-server"

    // return renderToString(
    //     <StaticRouter location={url} context={context} >
    //         <div>
    //             <Root />
    //             <script type="text/javascript" src={scriptSrc} />
    //         </div>
    //     </StaticRouter>
    // )

    return '<!DOCTYPE html>' + renderToStaticMarkup(
        <html>
            <head />
            <body>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <div id="app" />
                <script type="text/javascript" src={scriptSrc} />
                {// in dev, styles are handled by style-loader
                 // which directly injects them into the DOM
                !isDevelopment &&
                <link rel="stylesheet" href={styleSrc} name="appStyle" />}
            </body>
        </html>
    )
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
