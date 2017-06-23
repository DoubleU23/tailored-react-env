// import config         from '../config'
import {promisifyAll} from 'bluebird'
// import appConfig      from '../../config/appConfig.js'

const fsPromised = promisifyAll(require('fs'))

// const {
//     isDevelopment,
//     ports
// } = appConfig

// webpacks output.app.filename = [name].js
const DEFAULT = {js: 'app.js', css: 'app.css'}

const APP_JS_PATTERN = /^app-\w+\.js$/
const APP_CSS_PATTERN = /^app-\w+\.css$/

// tbd: refactor: handle additional assets by render/HTML.react class
// export const additionalAssets = {
//     'styles':   [],
//     'scripts':  []
// }

export default async function getAppAssetFilenamesAsync() { // eslint-disable-line space-before-function-paren
    if (process.env.NODE_ENV !== 'production') {
        return DEFAULT
    }

    try {
        const buildDirFiles = await fsPromised.readdirAsync('build')

        return {
            js:     buildDirFiles.find(filename => APP_JS_PATTERN.test(filename)),
            css:    buildDirFiles.find(filename => APP_CSS_PATTERN.test(filename))
        }
    } catch (e) {
        return DEFAULT
    }
}
