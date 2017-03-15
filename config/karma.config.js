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
preprocessors[paths.src + '/**/*.{js,jsx}'] = ['webpack'] // use webpack for ALL tests
// preprocessors[paths.src + '/**/*.{js,jsx}'] = ['webpack']
preprocessors[karmaEntryPoint] = ['webpack']
// preprocessors[paths.tests + '/test/**/*.test.{js,jsx}'] = ['webpack'] // collect coverage only for included tests!?

const instrumenters = {}
// instrumenters[paths.src + '/**/*.{js,jsx}'] = 'isparta'

const webpackConfig = webpackGetConfig(false)
webpackConfig.context = paths.ROOT
webpackConfig.plugins = []
webpackConfig.entry = null

webpackConfig.module.preLoaders = []
webpackConfig.module.preLoaders.push(
    {
        // collect coverage data
        // for all files that aren't tests
        test: /\.js$/,
        exclude: /(.*\.helper\.js|node_modules|resources\/js\/vendor|\.test\.js$|__tests__)/,
        loader: 'isparta-instrumenter'
    }
)

export default function(config) {
    config.set({
        basePath: paths.ROOT,

        frameworks: ['mocha', 'chai'],

        files: [
            // path.join(paths.tests, 'test', 'firstTest.test.js')
            // globs.src,
            karmaEntryPoint

            // paths.src + '/pages/*.{js,jsx}',
            // paths.tests + '/test/**/*.test.{js,jsx}'
        ],

        exclude: [
            paths.nodeModules,
            paths.src + '/**/*.test.js',
            paths.tests + '/**/!(karma.entry).js',
            paths.src + '/**/util/*.helper.js'
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
            require('karma-sourcemap-loader'),
            require('karma-coverage')
        ],

        reporters: ['mocha', 'coverage'],

        coverageReporter: {
            dir: '__coverage__',
            // instrumenters: { isparta : require('isparta') },
            // instrumenter: instrumenters,
            reporters: [
                {type: 'text-summary'}, // output text-summary to STDOUT
                {type: 'text-summary', 'file': 'text.txt'}, // output text-summary to __coverage__/{BROWSER}/text.txt
                {type : 'html', subdir: 'html'} // output html summary to __coverage__/html/
            ],
            fixWebpackSourcePaths: true
            // includeAllSources: false,
            // instrumenterOptions: {
            //     istanbul: {
            //         noCompact: true,
            //         debug: true
            //     }
            // }
        },

        mochaReporter: {
            showDiff: true
        },

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['Chrome'], /* , 'Firefox' */

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
