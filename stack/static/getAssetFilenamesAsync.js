// refactor: shove into utils/lib!?
import {promisifyAll} from 'bluebird'

import appConfig      from '../../config/appConfig'

const {
    debug, isProduction, paths
} = appConfig

const fsPromised        = promisifyAll(require('fs'))

// default for 'develpment'
const DEFAULT           = {js: 'app.js', css: 'app.css'}

const APP_JS_PATTERN    = /^app-\w+\.js$/
const APP_CSS_PATTERN   = /^app-\w+\.css$/

const getAssetFilenamesAsync = async forceReadDir => {
    if (!isProduction && !forceReadDir) {
        return DEFAULT
    }

    try {
        const buildDirFiles = await fsPromised.readdirAsync(paths.build)

        return {
            js:     buildDirFiles.find(filename => APP_JS_PATTERN.test(filename)),
            css:    buildDirFiles.find(filename => APP_CSS_PATTERN.test(filename))
        }
    }
    catch (err) {
        if (debug) {
            console.log('[getAssetFilenamesAsync->catch]', err)
        }
        return DEFAULT
    }
}

let appAssetFilenameCache = null
const getAssetFilenamesCachedAsync = async forceReadDir => {
    if (appAssetFilenameCache) return appAssetFilenameCache

    appAssetFilenameCache = await getAssetFilenamesAsync(forceReadDir)

    return appAssetFilenameCache
}

export default getAssetFilenamesCachedAsync
