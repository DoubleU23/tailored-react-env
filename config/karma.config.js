// refactor: try to use 'coverage-istanbul'
// => https://github.com/deepsweet/istanbul-instrumenter-loader#project-structure
import path             from 'path'

import webpack          from 'webpack'
import webpackGetConfig from '../stack/webpack/webpackGetConfig'
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
webpackConfig.module.rules.unshift({
    test: /\.js$/,
    exclude: /(.*\.helper\.js|node_modules|\.spec\.js$|\.test\.js$|__tests__)/,
    use: {
        loader: 'istanbul-instrumenter-loader',
        options: {
            produceSourceMap:   true,
            esModules:          true,
            debug:              true
        }
    },
    enforce: 'post'
})
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
// preprocessors[paths.src + '/**/*.{js}']     = ['coverage-istanbul'] // use webpack for ALL tests
preprocessors[karmaEntryPoint]              = ['webpack']

// additional modification for NODE_ENV test (travisCI)
const isTestEnv = process.env.NODE_ENV === 'test'
               || process.env.CONTINUOUS_INTEGRATION

const browserEngines = isTestEnv
    ? ['PhantomJS2'] // , 'PhantomJS2_custom'
    : ['Chrome', 'Firefox']

const entryFiles = isTestEnv
    // PhantomJS needs babel-polyfill (Object.assign)
    ? [{
        pattern: paths.nodeModules + '/babel-polyfill/dist/polyfill.js',
        // Should the files be included in the browser using <script> tag?
        included: true
    }]
    // babel-polyfill breaks test in the other browsers
    : []

// if (isTestEnv) {
//     process.env.PHANTOMJS_BIN = 'node_modules/phantomjs-prebuilt/bin/phantomjs'
// }

export default function(config) {
    config.set({
        // basePath: paths.ROOT,

        frameworks: ['mocha'],

        files: [...entryFiles, karmaEntryPoint],

        exclude: [
            paths.nodeModules,
            paths.src + '/**/*.test.js',
            // paths.tests + '/**/!(karma.entry).js',
            paths.src + '/**/util/*.helper.js'
        ],

        preprocessors:  preprocessors,

        webpack:        webpackConfig,

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
            require('karma-phantomjs2-launcher'),
            // coverage plugins
            require('karma-coverage'),
            require('karma-sourcemap-loader'),
            // reporter(s)
            require('karma-coverage-istanbul-reporter')
        ],

        reporters: !isTestEnv
            ? ['mocha', 'coverage-istanbul']
            : ['mocha', 'coverage-istanbul'],

        coverageIstanbulReporter: { // Groove Coverage! (carried away; by a moonlight shadow...)
            dir:        paths.coverage,
            // instrumenters: { isparta : require('isparta') },
            // instrumenter: instrumenters,
            reports: ['html', 'lcovonly', 'text-summary'],
            fixWebpackSourcePaths: true,
            // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
            skipFilesWithNoCoverage: true,

            'report-config': {
                'html': {subdir: 'html'}
            }
            // TBD: coverage thresholds
            // enforce percentage thresholds
        },

        mochaReporter: {
            showDiff: true
        },

        port: 9876,

        colors: true, // A.C.A.B -> all colors are beautiful

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: browserEngines, /* , 'Firefox' */
        // customLaunchers: {
        //     'PhantomJS2_custom': {
        //         base: 'PhantomJS2',
        //         options: {
        //             windowName: 'my-window',
        //             settings: {
        //                 webSecurityEnabled: false
        //             }
        //         },
        //         flags: ['--load-images=true'],
        //         debug: true
        //     }
        // },
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
