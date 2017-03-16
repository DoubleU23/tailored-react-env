// https://github.com/deepsweet/istanbul-instrumenter-loader#project-structure

import path         from 'path'

import webpack          from 'webpack'
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

const webpackConfig = webpackGetConfig(true)
// remove all plugins but the first
// (webpack.DefinePlugin to inject process.env vars)
webpackConfig.plugins.slice(0, 1)
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

const pathCoverage  = paths.src.replace(paths.ROOT, '..')
const pathTests     = paths.tests.replace(paths.ROOT, '..')

webpackConfig.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV:           JSON.stringify(process.env.NODE_ENV),
            IS_BROWSER:         true
        }
    }),
    new webpack.ContextReplacementPlugin(
        /CONTEXT_COVERAGE+/,            // resourceRegExp
        pathCoverage,               // newContentResource
        true,                       // newContentRecursive
        /^((?!index).)*(\.js)+$/    // newContentRegExp
    ),
    new webpack.ContextReplacementPlugin(
        /CONTEXT_TESTS+/,           // resourceRegExp
        pathTests,                  // newContentResource
        true,                       // newContentRecursive
        /\.test\.js$/igm            // newContentRegExp
    )
)

export default function(config) {
    config.set({
        // basePath: paths.ROOT,

        frameworks: ['mocha'],

        files: [
            karmaEntryPoint
        ],

        exclude: [
            paths.nodeModules,
            paths.src + '/**/*.test.js',
            // paths.tests + '/**/!(karma.entry).js',
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
            // testing libs
            require('karma-mocha'),
            require('karma-mocha-reporter'),
            require('karma-chai'),
            // browser engines
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require('karma-phantomjs-launcher'),
            // coverage plugins
            require('karma-coverage')
        ],

        reporters: ['mocha', 'coverage'],

        coverageReporter: {
            dir:        paths.coverage,
            // instrumenters: { isparta : require('isparta') },
            // instrumenter: instrumenters,
            reporters:  [
                {type: 'text-summary'}, // output text-summary to STDOUT
                {type: 'text-summary', 'file': 'text.txt'}, // output text-summary to __coverage__/{BROWSER}/text.txt
                {type : 'html', subdir: 'html'} // output html summary to __coverage__/html/
            ],
            fixWebpackSourcePaths: true,
            includeAllSources: false,
            includeUntested: false
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
