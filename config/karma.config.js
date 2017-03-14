import path         from 'path'

import webpackGetConfig from '../webpack/webpackGetConfig'
import appConfig        from './appConfig'

const {
    paths,
    globs
} = appConfig

const preprocessors            = {}
// preprocessors[globs.testFiles] = 'webpack'
preprocessors[paths.tests + '/test/**'] = 'webpack'
// preprocessors[path.join(paths.tests, 'test', 'firstTest.js')] = 'webpack'

const webpackConfig = webpackGetConfig()

export default function(config) {
    config.set({
        basePath: paths.ROOT,

        frameworks: ['mocha', 'chai'],

        files: [
            // 'node_modules/babel-polyfill/browser.js',
            // globs.testFiles
            path.join(paths.tests, 'test', 'firstTest.js')
        ],

        exclude: [

        ],

        preprocessors: preprocessors,

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true
        },

        plugins: [
            require('karma-webpack'),
            require('karma-chai'),
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require('karma-mocha'),
            require('karma-mocha-reporter'),
            require('karma-phantomjs-launcher')
        ],

        reporters: ['mocha'],

        mochaReporter: {
            showDiff: true
        },

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['Chrome', 'Firefox'],

        // customLaunchers: {
        //     IE9: {
        //         base: 'IE',
        //         'x-ua-compatible': 'IE=EmulateIE9'
        //     }
        // },

        singleRun: true,

        concurrency: Infinity

    })
}
