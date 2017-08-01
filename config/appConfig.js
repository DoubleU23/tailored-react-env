'use strict'

import appPaths from './paths'

let config
if (!process.env.IS_BROWSER) {
    config = require('config')
}
else {
    console.log('browserConfig', process.env.CONFIG)
    config = process.env.CONFIG
}

console.log('appConfig: config', config)

const {
    ports:  {portFE, portHMR, portBSProxy, portBSUI},
    api
} = config

export const getAppConfig = _isDevelopment => {
    const isDevelopment = typeof _isDevelopment !== 'undefined'
        ? _isDevelopment
        : process.env.NODE_ENV !== 'production'

    const webpackConfig = {
        isDevelopment,
        isProduction: (process.env.NODE_ENV === 'production'),
        isCI: (
            process.env.CONTINUOUS_INTEGRATION
        ||  process.env.TRAVIS
        ||  process.env.NODE_ENV === 'CI'
        ),
        paths:          appPaths,

        globs:          {
            scripts:        appPaths.ROOT          + '/**/*.js',
            src:            appPaths.src           + '/**/*.js',
            nodeModules:    appPaths.nodeModules   + '/**',
            testFiles:      appPaths.tests         + '/**/*.test.{js,jsx}',
            coverage:       appPaths.coverage      + '/**/*',
            build:          appPaths.build         + '/**/*'
        },

        api, // from 'config'

        ports:  {
            portFE, portHMR, portBSProxy, portBSUI
        },

        browserSync: {
            portProxy:      portBSProxy,
            portUI:         portBSUI
        },

        scripts: {
            src:            appPaths.src + '/**/*.js',
            dest:           appPaths.build + '/js/'
        },

        configFiles:  {
            eslint: appPaths.ROOT + '/.eslintrc'
        },

        images: {
            src: './app/images/**/*.{jpeg,jpg,png,gif}',
            dest: './build/images/'
        },

        styles: {
            src: './app/styles/**/*.scss',
            dest: './build/css/'
        },

        assetExtensions: [
            'js',
            'css',
            'png',
            'jpg',
            'jpe?g',
            'gif',
            'svg',
            'eot',
            'otf',
            'ttc',
            'ttf',
            'woff2?'
        ],

        timings: {
            timeout: process.env.NODE_ENV === 'TEST'
                ? 1500 // mocha has 2000ms timeout for async it()
                : 3000
        }

    }

    return webpackConfig
}

export default getAppConfig()
