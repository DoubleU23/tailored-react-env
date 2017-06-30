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
  // 'css': '',
    'less':     '!less-loader',
  // inject
  // 'sj': '!stylus-loader',
    'scss':     '!sass-loader',
    'sass':     '!sass-loader?indentedSyntax',
    'styl':     '!stylus-loader',
    'stylo':    '!cssobjects-loader!stylus-loader!'
}

const serverIp = ip.address()

const webpackGetConfig = _isDevelopment => {
    const isDevelopment = _isDevelopment || appConfig.isDevelopment

    const stylesLoaders = () => {
        return Object.keys(loaders).map(ext => {
            const prefix    = ext === 'stylo'
        ?   ''
        :   'css-loader!postcss-loader'
            const extLoaders = prefix + loaders[ext]
            const loader = isDevelopment
        ? `style-loader!${extLoaders}`
        : ExtractTextPlugin.extract('style-loader', extLoaders)
            return {
                loader: loader,
                test: new RegExp(`\\.(${ext})$`)
            }
        })
    }

    const config = {
        hotPort:    ports.HMR,
        cache:      isDevelopment,
        debug:      isDevelopment,
        devtool:    'inline-source-map', // isDevelopment ? devtools : '',
        entry: {
            app: isDevelopment ? [
                `webpack-hot-middleware/client?path=http://${serverIp}:${ports.HMR}/__webpack_hmr`,
                path.join(paths.src, 'index.js')
            ] : [
                path.join(paths.src, 'index.js')
            ]
        },
        module: {
            loaders: [{
                loader: 'url-loader?limit=100000',
                test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/
            }, {
                exclude: /node_modules/,
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
            }].concat(stylesLoaders())
        },
        stylus: {
            use:        [doubleu23Stylus(), nib()],
            compress:   isDevelopment
    // ,    imports: ['src/common/style/project/index.styl']
        },
        output: isDevelopment ? {
            path: paths.build,
            filename: '[name].js',
            chunkFilename: '[name]-[chunkhash].js',
            publicPath: `http://${serverIp}:${ports.HMR}/build/`
        } : {
            path: paths.build,
            filename: '[name]-[hash].js',
            chunkFilename: '[name]-[chunkhash].js'
        },
        externals: {
            'cheerio': 'window',
            'react/addons': true,
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': true,
            'fs': {}
        },
        plugins: (() => {
            const plugins = [
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV:       JSON.stringify(isDevelopment ? 'development' : 'production'),
                        APP_CONFIG:     JSON.stringify(appConfig),
                        IS_BROWSER:     true
                    }
                })
            ]
            if (isDevelopment) {
                plugins.push(
                    new webpack.optimize.OccurenceOrderPlugin(),
                    new webpack.HotModuleReplacementPlugin(),
                    new webpack.NoErrorsPlugin()
                )
            }
            else {
                plugins.push(
                    // Render styles into separate cacheable file to prevent FOUC and
                    // optimize for critical rendering path.
                    new ExtractTextPlugin('app-[hash].css', {
                        allChunks: true
                    }),
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.OccurenceOrderPlugin(),
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            screw_ie8: true, // eslint-disable-line camelcase
                            warnings: false // Because uglify reports irrelevant warnings.
                        }
                    })
                )
            }
            return plugins
        })(),
        postcss: () => [
            autoprefixer({browsers: 'last 2 version'}),
            cssMqPacker()
        ],
        resolve: {
            extensions: ['', '.js', '.json'],
            modulesDirectories: ['src', 'node_modules'],
            root: constants.ABSOLUTE_BASE,
            alias: {
                'react$': require.resolve(path.join(paths.nodeModules, 'react'))
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
