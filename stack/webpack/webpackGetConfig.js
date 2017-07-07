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

import constants         from './constants'
import appConfig         from '../../config/appConfig'

import objectAssign      from 'object-assign-deep'

const {
    ports,
    paths
} = appConfig

const devtools = process.env.CONTINUOUS_INTEGRATION
  ? 'inline-source-map'
  // cheap-module-eval-source-map, because we want original source, but we don't
  // care about columns, which makes this devtool faster than eval-source-map.
  // http://webpack.github.io/docs/configuration.html#devtool
  : 'cheap-module-eval-source-map'

const loaders = {
    'css': '',
    // 'less':     '!less-loader',
    // inject
  // 'sj': '!stylus-loader',
    // 'scss':     '!sass-loader',
    // 'sass':     '!sass-loader?indentedSyntax',
    'styl':     '!stylus-loader'
    // 'stylo':    '!cssobjects-loader!stylus-loader!'
}

const serverIp = ip.address()

const webpackGetConfig = _isDevelopment => {
    const isDevelopment = _isDevelopment || appConfig.isDevelopment

    // const stylesLoaders = () => {
    //     return Object.keys(loaders).map(ext => {
    //         const prefix    = ext === 'stylo'
    //     ?   ''
    //     :   'css-loader!postcss-loader'
    //         const extLoaders = prefix + loaders[ext]
    //         const loader = isDevelopment
    //     ? `style-loader!${extLoaders}`
    //     : ExtractTextPlugin.extract('style-loader', extLoaders)
    //         return {
    //             loader: loader,
    //             test: new RegExp(`\\.(${ext})$`)
    //         }
    //     })
    // }

    const stylesLoaders = Object.keys(loaders).map(ext => {
        const prefix     = 'css-loader!postcss-loader'
        const extLoaders = prefix + loaders[ext]
        const loader     = isDevelopment
            ? `style-loader!${extLoaders}`
            : ExtractTextPlugin.extract({
                fallback:       'style-loader',
                loader:         extLoaders
            })
        return {
            loader,
            test: new RegExp(`\\.(${ext})$`)
        }
    })
    console.log('stylesLoaders orig', stylesLoaders)


    const config = {
        target:     'web',
        cache:      isDevelopment,

        // devtool:    false, // handled by "SourceMapDevToolPlugin"
        devtool: 'cheap-module-source-map',

        entry: {
            app: isDevelopment ? [
                `webpack-hot-middleware/client?path=http://${serverIp}:${ports.HMR}/__webpack_hmr`,
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
            publicPath:         `http://${serverIp}:${ports.HMR}/build/`
        } : {
            path: paths.build,
            filename: '[name]-[hash].js',
            // sourceMapFilename: '[name]-[hash].js',
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
                        // other presets are defined in .eslintrc
                        presets: [
                            // ['env', { modules: false }],
                            'es2015', 'react', 'stage-0', 'stage-1', 'stage-2', 'stage-3'
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
                // not needed (only handles extern sourcemaps (in module packages))
                {
                    test:       /\.js$/,
                    use:        ['source-map-loader'],
                    enforce:    'pre'
                },
                {
                    test: /\.styl$/,
                    use: [
                        { loader: 'style-loader',   options: { sourceMap: true } },
                        { loader: 'css-loader',     options: { sourceMap: true } },
                        { loader: 'postcss-loader', options: { sourceMap: true } },
                        {
                            loader: 'stylus-loader',
                            options: {
                                sourceMap: true,
                                use: [nib()]
                            }
                        }
                    ]
                }
            ]
            // .concat(stylesLoaders)

        /* {
                test: /\.styl$/,
                loader: '!style-loader!css-loader!postcss-loader?sourceMap=true!stylus-loader'
            }, {
                exclude: /(node_modules|\.styl)/,
                loader: 'babel',
                query: {
                  // If cacheDirectory is enabled, it throws:
                  // Uncaught Error: locals[0] does not appear to be a `module` object with Hot Module replacement API enabled.
                  // cacheDirectory: true,
                    env: {
                        // test: {
                        //     presets: ['airbnb']
                        // },
                        development: {
                            // presets: ['es2015', 'react', 'stage-0', 'stage-2', 'stage-3'],
                            plugins: [
                                // ['syntax-object-rest-spread'], ['syntax-async-functions'], ['transform-decorators-legacy'],
                                ['react-transform', {
                                    transforms: [{
                                        transform: 'react-transform-hmr',
                                        imports: ['react'],
                                        locals: ['module']
                                    }, {
                                        transform: 'react-transform-catch-errors',
                                        imports: ['react', 'redbox-react']
                                    }]
                                }]
                            ]
                        }
                    }
                },
                test: /\.js$/
            }] */



            // .concat([])
            // .concat(stylesLoaders())
        },
        externals: {
            'cheerio': 'window',
            'react/addons': true,
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': true,
            'fs': {}
        },
        plugins: (() => {
            console.log('stylesLoaders', stylesLoaders)

            const plugins = [
                new webpack.LoaderOptionsPlugin({
                    minimize:   !isDevelopment,
                    debug:      isDevelopment,
                    // Webpack 2 no longer allows custom properties in configuration.
                    // Loaders should be updated to allow passing options via loader options in module.rules.
                    // Alternatively, LoaderOptionsPlugin can be used to pass options to loaders
                    hotPort:    ports.HMR,
                    // sourceMap:  true,
                    postcss:    () => [
                        autoprefixer({ browsers: 'last 2 version' }),
                        cssMqPacker()
                    ],
                    stylus: {
                        use:        [nib()], // doubleu23Stylus()
                        compress:   isDevelopment
                        // ,    imports: ['src/common/style/project/index.styl']
                    }
                }),
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV:       JSON.stringify(isDevelopment ? 'development' : 'production'),
                        APP_CONFIG:     JSON.stringify(appConfig),
                        BUILD_STATIC:   JSON.stringify(process.env.BUILD_STATIC === 'TRUE'),
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
                            screw_ie8: true, // eslint-disable-line camelcase
                            warnings: true // Because uglify reports irrelevant warnings.
                        }
                    })
                    //
                    //
                    // ???
                    // TBD: do we need/want este`s webpackIsomorphicToolsPlugin ???

                    // TBD: https://github.com/kevlened/copy-webpack-plugin
                    // new CopyWebpackPlugin(
                    //     [
                    //         {
                    //             from: './src/common/app/favicons/',
                    //             to: 'favicons'
                    //         }
                    //     ],
                    //     {
                    //         ignore: ['original/**']
                    //     },
                    // ),
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
            modules:            [paths.nodeModules],
            alias: {
                'react$':       require.resolve(path.join(paths.nodeModules, 'react'))
            }
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
        config.devServer = devServer
    }

    return config
}

export default webpackGetConfig
