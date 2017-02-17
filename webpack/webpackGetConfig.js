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

import constants         from './constants'

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

export default function webpackGetConfig (_isDevelopment) {
  const isDevelopment = isDevelopment != null
    ? isDevelopment
    : (process.env.APP_ENV || false)

  function stylesLoaders () {
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
    hotPort: constants.HOT_RELOAD_PORT,
    cache: isDevelopment,
    debug: isDevelopment,
    devtool: isDevelopment ? devtools : '',
    entry: {
      app: isDevelopment ? [
        `webpack-hot-middleware/client?path=http://${serverIp}:${constants.HOT_RELOAD_PORT}/__webpack_hmr`,
        path.join(constants.SRC_DIR, 'js/index.js')
      ] : [
        path.join(constants.SRC_DIR, 'js/index.js')
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
            development: {
              plugins: ['syntax-object-rest-spread', 'syntax-async-functions', 'transform-regenerator', 'transform-decorators'],
              presets: ['es2015', 'react']
              // plugins: ['react-transform'], // HANDLED BY
              // extra: {
              //  'react-transform': {
              //      transforms: [{
              //          transform: 'react-transform-hmr',
              //          imports: ['react'],
              //          locals: ['module']
              //      }, {
              //          transform: 'react-transform-catch-errors',
              //          imports: ['react', 'redbox-react']
              //      }]
              //  }
              // }
            }
          }
        },
        test: /\.js$/
      }].concat(stylesLoaders())
    },
    stylus: {
      use: [doubleu23Stylus(), nib()],
      compress:       isDevelopment
    // ,    imports: ['src/common/style/project/index.styl']
    },
    output: isDevelopment ? {
      path: constants.BUILD_DIR,
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: `http://${serverIp}:${constants.HOT_RELOAD_PORT}/build/`
    } : {
      path: constants.BUILD_DIR,
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[chunkhash].js'
    },
    plugins: (() => {
      const plugins = [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV:   JSON.stringify(isDevelopment ? 'development' : 'production'),
            IS_BROWSER:     true
          }
        })
      ]
      if (isDevelopment) plugins.push(
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
      )
      else plugins.push(
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
        'react$': require.resolve(path.join(constants.NODE_MODULES_DIR, 'react'))
      }
    }
  }

  return config
}
