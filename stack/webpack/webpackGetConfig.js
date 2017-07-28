'use strict'

import webpack           from 'webpack'
import path              from 'path'
import ip                from 'ip'
// webpack/build plugins
import autoprefixer      from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import nib               from 'nib'
import cssMqPacker       from 'css-mqpacker'
// custom libs
import doubleu23Stylus   from 'doubleu23-stylus'

// import BrowserSyncPlugin from 'browser-sync-webpack-plugin'
import paths             from '../../config/paths'
// import appConfig         from '../../config/appConfig'

const config = require('config')
console.log('webpackGetConfig: config', config)
// process.env.CONFIG = config

const {
    ports: {portHMR}
} = config

const serverIp = ip.address()

const webpackGetConfig = _isDevelopment => {
    const isDevelopment = _isDevelopment != null
        ? _isDevelopment
        : config.isDevelopment

    const stylusLoaderDefinition = {
        loader: 'stylus-loader',
        options: {
            sourceMap:  true,
            compress:   isDevelopment,
            use:        [nib(), doubleu23Stylus({
                envVars:    {
                    // refactor: build object on top and
                    // find a way to re-use it in webpack.DefinePlugin
                    NODE_ENV:       process.env.NODE_ENV,
                    BUILD_STATIC:   process.env.BUILD_STATIC,
                    DEBUG:          process.env.DEBUG
                },
                mediaQueries:       {
                    'custom':   'only screen and (min-width: 1300px)'
                },
                envPrefix:          '$ENV__'
            })]
        }
    }

    const webpackConfig = {
        target:     'web',
        cache:      !isDevelopment,
        devtool:    process.env.CONTINUOUS_INTEGRATION
          ? 'inline-source-map'
          : 'cheap-module-source-map',
        entry: {
            app: isDevelopment ? [
                `webpack-hot-middleware/client?path=http://${serverIp}:${portHMR}/__webpack_hmr`,
                path.join(paths.src, 'index.js')
            ] : [
                path.join(paths.src, 'index.js')
            ]
        },
        output: isDevelopment ? {
            path:               paths.build,
            filename:           '[name].js',
            sourceMapFilename:  '[name].js.map.sourceMapFilename',
            chunkFilename:      '[name]-[chunkhash].js',
            publicPath:         `http://${serverIp}:${portHMR}/build/`
        } : {
            path: paths.build,
            filename: '[name]-[hash].js',
            // ??? sourceMapFilename: '[name]-[hash].js',
            chunkFilename: '[name]-[chunkhash].js'
        },
        module: {
            rules: [
                // URL LOADER
                // (different limits for different fileTypes)
                {
                    loader: 'url-loader',
                    test: /\.(gif|jpg|png|svg)(\?.*)?$/,
                    exclude:  /\.styl$/,
                    options: { limit: 10000 }
                },
                {
                    loader: 'url-loader',
                    test: /favicon\.ico$/,
                    exclude:  /\.styl$/,
                    options: { limit: 1 }
                },
                {
                    loader: 'url-loader',
                    test: /\.(ttf|eot|woff|woff2)(\?.*)?$/,
                    exclude:  /\.styl$/,
                    options: { limit: 100000 }
                },
                // BABEL
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude:  /(node_modules|bower_components|styles)/,
                    options: {
                        retainLines: true,
                        sourceMap: true,
                        babelrc: true,
                        cacheDirectory: false,
                        // presets/plugins have to match defines in .babelrc
                        presets: [
                            ['env', { modules: false }],
                            'es2015', 'react', 'stage-2', 'stage-3'
                        ],
                        plugins: [
                            [
                                'transform-runtime',
                                {
                                    helpers: false,
                                    polyfill: true,
                                    regenerator: false
                                }
                            ],
                            'transform-decorators-legacy'
                        ],
                        env: {
                            production: {
                                plugins: ['transform-react-constant-elements']
                            }
                        }
                    }
                },
                // SOURCEMAPS
                // refactor: show source instead of compiled
                // not needed (only handles extern sourcemaps (in module packages))
                {
                    test:       /\.js$/,
                    use:        ['source-map-loader'],
                    enforce:    'pre'
                },
                // STYLUS
                {
                    test: /\.(styl|less)$/,
                    use: isDevelopment ? [
                        { loader: 'style-loader',   options: { sourceMap: true } },
                        { loader: 'css-loader',     options: { sourceMap: true } },
                        { loader: 'postcss-loader', options: { sourceMap: true } },
                        stylusLoaderDefinition
                    ]
                    // for production (https://github.com/webpack-contrib/extract-text-webpack-plugin)
                    : ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'postcss-loader', stylusLoaderDefinition]
                    })
                }
            ]
            // .concat(stylesLoaders)
        },
        externals: {
            'jsdom':    'window',
            'cheerio':  'window',
            'react/addons': true,
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': true,
            'fs': {}
        },
        plugins: (() => {
            const plugins = [
                new webpack.LoaderOptionsPlugin({
                    minimize:   !isDevelopment,
                    debug:      isDevelopment,
                    // Webpack 2 no longer allows custom properties in configuration.
                    // Loaders should be updated to allow passing options via loader options in module.rules.
                    // Alternatively, LoaderOptionsPlugin can be used to pass options to loaders
                    hotPort:    portHMR,
                    sourceMap:  true,
                    postcss:    () => [
                        autoprefixer({ browsers: 'last 2 version' }),
                        cssMqPacker()
                    ]
                }),
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV:       JSON.stringify(isDevelopment ? 'development' : 'production'),
                        CONFIG:         JSON.stringify(config),
                        BUILD_STATIC:   JSON.stringify(process.env.BUILD_STATIC === 'true'),
                        DEBUG:          JSON.stringify(process.env.DEBUG === 'true'),
                        IS_BROWSER:     true
                    }
                }),
                new webpack.ProvidePlugin({
                    'Promise': 'bluebird'
                })
            ]
            if (isDevelopment) {
                plugins.push(
                    new webpack.HotModuleReplacementPlugin(),
                    new webpack.NoEmitOnErrorsPlugin()
                )
            }
            else {
                plugins.push(
                    new webpack.LoaderOptionsPlugin({minimize: true}),
                    new ExtractTextPlugin({
                        filename:   'app-[hash].css',
                        disable:    false,
                        allChunks:  true
                    }),
                    new webpack.optimize.OccurrenceOrderPlugin(),
                    new webpack.optimize.UglifyJsPlugin({
                        sourceMap: true,
                        compress: {
                            screw_ie8:  true, // eslint-disable-line camelcase
                            warnings:   false // Because uglify reports irrelevant warnings.
                        }
                    })
                    //
                    //
                    // ???
                    // TBD: do we need/want este`s webpackIsomorphicToolsPlugin ???
                )
            }

            // handled by config.devtool + config.output.sourceMapFilename
            //
            // plugins.push(new webpack.SourceMapDevToolPlugin({
            //     // filename: '[name].js.SourceMapDevToolPlugin.map'
            //     filename: isDevelopment
            //         ? '[name].js.map'
            //         : '[name]-[chunk].js.map'
            // }))

            return plugins
        })(),
        performance: {
            hints: false
            // TODO: Reenable it once Webpack 2 will complete dead code removing.
            // hints: process.env.NODE_ENV === 'production' ? 'warning' : false
        },
        resolve: {
            extensions:         ['.js', '.styl'],
            modules:            [paths.nodeModules]
            // alias: {
            //     'react$':       require.resolve(path.join(paths.nodeModules, 'react'))
            // }
        }
    }

    // Webpack Dev Server - Header Settings
    //
    // not needed here, because we handle the dev-server per 'webpack-dev-middleware'
    // so we set the headers in /webpack/devServer/start.js
    // anyway...
    // we also define it here,
    // so you can use the compiled config for a 'webpack-dev-server' based implementation
    if (_isDevelopment) {
        const devServer = {
            headers: {'Access-Control-Allow-Origin': '*'}
        }
        webpackConfig.devServer = devServer
    }

    return webpackConfig
}

export default webpackGetConfig
