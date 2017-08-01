import {promisifyAll} from 'bluebird'

const fsPromised = promisifyAll(require('fs'))

const DEFAULT = {js: 'app.js', css: 'app.css'}

const APP_JS_PATTERN = /^app-\w+\.js$/
const APP_CSS_PATTERN = /^app-\w+\.css$/

const getAppAssetFilenamesAsync = async () => { // eslint-disable-line space-before-function-paren
    if (process.env.NODE_ENV !== 'production') {
        return DEFAULT
    }

    try {
        const buildDirFiles = await fsPromised.readdirAsync('build')

        return {
            js:     buildDirFiles.find(filename => APP_JS_PATTERN.test(filename)),
            css:    buildDirFiles.find(filename => APP_CSS_PATTERN.test(filename))
        }
    }
    catch (e) {
        return DEFAULT
    }
}


let appAssetFilenameCache = null
const getAppAssetFilenamesCachedAsync = async () => {
    if (appAssetFilenameCache) return appAssetFilenameCache

    appAssetFilenameCache = await getAppAssetFilenamesAsync()

    return appAssetFilenameCache
}

export default getAppAssetFilenamesCachedAsync
