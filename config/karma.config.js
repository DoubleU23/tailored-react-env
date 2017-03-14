// https://github.com/deepsweet/istanbul-instrumenter-loader#project-structure

import path         from 'path'

import webpackGetConfig from '../webpack/webpackGetConfig'
import appConfig        from './appConfig'

const {
    paths,
    globs
} = appConfig

const karmaEntryPoint = path.join(paths.tests, 'karma.entry.js')

const preprocessors            = {}
// preprocessors[paths.src + '/components/*.js'] = ['webpack', 'coverage'] // use webpack for ALL tests
// preprocessors[paths.src + '/*/*.js'] = ['webpack', 'coverage'] // use webpack for ALL tests

preprocessors[paths.tests + '/test/**/*.test.{js,jsx}'] = ['webpack'] // collect coverage only for included tests!?

const webpackConfig = webpackGetConfig(false)
webpackConfig.entry = undefined

// defines which fucking files are covered in the coverage report
webpackConfig.module.postLoaders = [
    {
        // collect coverage data
        // for all files that aren't tests
        test: /\.js$/,
        exclude: /(node_modules|resources\/js\/vendor|\.test\.js$)/,
        loader: 'istanbul-instrumenter'
    }
]

export default function(config) {
    config.set({
        basePath: paths.ROOT,

        frameworks: ['mocha', 'chai'],

        files: [
            // path.join(paths.tests, 'test', 'firstTest.test.js')
            // globs.src,
            // karmaEntryPoint
            // paths.src + '/components/*.js',
            // paths.src + '/*/*.js',
            paths.tests + '/test/**/*.test.{js,jsx}'
        ],

        exclude: [
            paths.nodeModules,
            // paths.src + '/**/*.test.js',
            paths.src + '/**/__tests__/*.test.js'
        ],

        preprocessors: preprocessors,

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true,
            stats: 'errors-only'
        },

        plugins: [
            require('karma-webpack'),
            require('karma-chai'),
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require('karma-mocha'),
            require('karma-mocha-reporter'),
            require('karma-phantomjs-launcher'),

            require('karma-coverage')
        ],

        reporters: ['mocha', 'coverage'],

        coverageReporter: {
            dir: '__coverage__',
            reporters: [
                {type: 'text-summary'}, // output text-summary to STDOUT
                {type: 'text-summary', 'file': 'text.txt'}, // output text-summary to __coverage__/{BROWSER}/text.txt
                {type : 'html', subdir: 'html'} // output html summary to __coverage__/html/
            ],
            fixWebpackSourcePaths: true,
            includeAllSources: false,
            instrumenterOptions: {
                istanbul: {
                    noCompact: true,
                    debug: true
                }
            }
        },

        mochaReporter: {
            showDiff: true
        },

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['Chrome', 'Firefox'], /* , 'Firefox' */

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
