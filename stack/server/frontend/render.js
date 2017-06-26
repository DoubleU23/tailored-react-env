// REACT LIBS
import React                     from 'react'
import ReactDOMServer            from 'react-dom/server'
// import Html                   from './Html.react'
import {createMemoryHistory}     from 'history'
import {RoutingContext, match}   from 'react-router'
import BrowserRouter   from 'react-router/BrowserRouter'
// OTHER LIBS
import ip                        from 'ip'
// refactor: use bluebird as polyfill on entrypoint(s)
import Promise                   from 'bluebird'
// APP FILES
import getAppAssetFilenamesAsync from './getAssetPaths'
import appConfig                 from '../../../config/appConfig.js'

import initialState              from '../../../app/js/stores/initialState.js'
import stores                    from '../../../app/js/stores/index.js'

import createRoutes              from '../../../app/js/createRoutes.js'

console.log('initialState?', initialState)

const {
    isDevelopment,
    ports
} = appConfig

const serverIp  = ip.address()

export default async function render(req, res, next) {
    const store    = stores
    const routes   = createRoutes(store)

    // const location = createMemoryHistory().createLocation(req.url)

    const html = await renderPageAsync()
    res.send(html)
    return

/*
    match({routes, location}, async (error, redirectLocation, renderProps) => {
        // refactor: TBD: learn more about "redirectLocation"
        if (redirectLocation) {
            res.redirect(301, redirectLocation.pathname + redirectLocation.search)
            return
        }

        if (error) {
            next(error)
            return
        }

        // TBD: refactor: handle 404 on SSR
        // // Not possible with * route.
        // if (renderProps == null) {
        //   res.send(404, 'Not found')
        //   return
        // }

        try {
            await fetchComponentDataAsync(store.dispatch, renderProps)
            const html = await renderPageAsync(store, renderProps, req)
            res.send(html)
        } catch (err) {
            console.log('[server/frontend/render.js->render()] Error: ', err)
            next(err)
        }
    })
*/
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
