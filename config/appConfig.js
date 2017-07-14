'use strict'

import path   from 'path'
// import config from 'config'

// const config = {get: () => {}}

// console.log(process.env.APP_CONFIG)
// console.log(JSON.parse(process.env.APP_CONFIG))

const rootDir       = path.normalize(path.join(__dirname, '..'))
const paths         = {
    ROOT:           rootDir,
    stack:          path.join(rootDir, 'stack'),
    server:         path.join(rootDir, 'stack', 'server'),
    testServer:     path.join(rootDir, 'stack', 'server', 'test'),
    app:            path.join(rootDir, 'app'),
    src:            path.join(rootDir, 'app', 'js'),
    configs:        path.join(rootDir, 'config'),
    build:          path.join(rootDir, 'build'),
    tests:          path.join(rootDir, '__tests__'),
    coverage:       path.join(rootDir, '__coverage__'),
    nodeModules:    path.join(rootDir, 'node_modules')
}

export const getAppConfig = _isDevelopment => {
    const isDevelopment = typeof _isDevelopment !== 'undefined'
        ? _isDevelopment
        : process.env.NODE_ENV !== 'production'

    const config = {
        isDevelopment,
        isProduction: (process.env.NODE_ENV === 'production'),
        isCI: (
            process.env.CONTINUOUS_INTEGRATION
        ||  process.env.TRAVIS
        ||  process.env.NODE_ENV === 'CI'
        ),
        paths,

        globs:          {
            scripts:        paths.ROOT          + '/**/*.js',
            src:            paths.src           + '/**/*.js',
            nodeModules:    paths.nodeModules   + '/**',
            testFiles:      paths.tests         + '/**/*.test.{js,jsx}',
            coverage:       paths.coverage      + '/**/*',
            build:          paths.build         + '/**/*'
        },

        // refactor: shove into config files
        api:    {
            // base:           'http://localhost:8001/api',
            base:           'https://shoreline-dev.tailored-apps.com/api/v1/bc',
            endpoints: {
                benefits:   '/campaigns',
                campaigns:  '/campaigns',
                vouchers:   '/voucher'
            }
        },

        ports:  {
            frontend:       8000, // config.get('portFE'),
            HMR:            8080  // config.get('portHMR')
        },

        browserSync: {
            portProxy:      8001, // config.get('portBSProxy'),
            portUI:         3000  // config.get('portBSUI')
        },

        scripts: {
            src:            paths.src + '/**/*.js',
            dest:           paths.build + '/js/'
        },

        configFiles:  {
            eslint: paths.ROOT + '/.eslintrc'
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

    return config
}

export default getAppConfig()
