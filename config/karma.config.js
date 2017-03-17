// refactor: try to use 'coverage-istanbul'
// => https://github.com/deepsweet/istanbul-instrumenter-loader#project-structure
import path             from 'path'

import webpack          from 'webpack'
import webpackGetConfig from '../webpack/webpackGetConfig'
import appConfig        from './appConfig'

const {paths} = appConfig

// __      _____ ___ ___  _   ___ _  __         ___ ___  _  _ ___ ___ ___
// \ \    / / __| _ ) _ \/_\ / __| |/ /  ___   / __/ _ \| \| | __|_ _/ __|
//  \ \/\/ /| _|| _ \  _/ _ \ (__| ' <  |___| | (_| (_) | .` | _| | | (_ |
//   \_/\_/ |___|___/_|/_/ \_\___|_|\_\        \___\___/|_|\_|_| |___\___|
//
// refactor: handle modifications in webpackGetConfig by NODE_ENV 'test'!?
const webpackConfig = webpackGetConfig(true) // true = _isDevelopment
// remove all plugins but the first
// (= webpack.DefinePlugin to inject process.env vars - which may be needed for test-rendering our components)
webpackConfig.plugins.slice(0, 1)
// remove entry-point which will be handled by karma.config->files
webpackConfig.entry = null
// add webpack preLoader "isparta-instrumenter"
webpackConfig.module.preLoaders = [{
    // collects coverage data
    // for all files that aren't tests
    test: /\.js$/,
    exclude: /(.*\.helper\.js|node_modules|resources\/js\/vendor|\.test\.js$|__tests__)/,
    loader: 'isparta-instrumenter'
}]
// SETUP for karma.entry.js' require.context
// => https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
webpackConfig.plugins.push(
    new webpack.ContextReplacementPlugin(
        /CONTEXT_COVERAGE+/, paths.src, true, /^((?!index).)*(\.js)+$/igm
    ),
    new webpack.ContextReplacementPlugin(
        /CONTEXT_TESTS+/, paths.tests, true, /\.test\.js$/igm
    ),
    new webpack.ContextReplacementPlugin(
        /CONTEXT_SPECS+/, paths.src, true, /\.spec\.js$/igm
    )
)

//  _  __   _   ___ __  __   _            ___ ___  _  _ ___ ___ ___
// | |/ /  /_\ | _ \  \/  | /_\    ___   / __/ _ \| \| | __|_ _/ __|
// | ' <  / _ \|   / |\/| |/ _ \  |___| | (_| (_) | .` | _| | | (_ |
// |_|\_\/_/ \_\_|_\_|  |_/_/ \_\        \___\___/|_|\_|_| |___\___|
//
const karmaEntryPoint = path.join(paths.tests, 'karma.entry.js')
const instrumenters = {}
instrumenters[karmaEntryPoint] = 'isparta'
// define preprocessors (use karma-webpack for src files and karmaEntryPoint)
const preprocessors                         = {}
preprocessors[paths.src + '/**/*.{js,jsx}'] = ['webpack'] // use webpack for ALL tests
preprocessors[karmaEntryPoint]              = ['webpack']

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
            // preprocessor
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
            require('karma-coverage'),
            require('karma-sourcemap-loader'),
            // reporter(s)
            require('karma-nyan-reporter')
        ],

        reporters: ['nyan', 'coverage'],

        coverageReporter: { // Groove Coverage! (carried away; by a moonlight shadow...)
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

        colors: true, // A.C.A.B -> all colors are beautiful

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['Chrome', 'Firefox'], /* , 'Firefox' */

        // customLaunchers: {
        //     IE9: {
        //         base: 'IE',
        //         'x-ua-compatible': 'IE=EmulateIE9'
        //     }
        // },

        // singleRun: true, // handled by gulp-karma in /gulp/tasks/karma.js

        concurrency: Infinity

    })
}
