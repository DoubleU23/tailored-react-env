'use strict'

import path   from 'path'
// import config from 'config'

const config = {get: () => {}}

console.log(process.env.APP_CONFIG)
// console.log(JSON.parse(process.env.APP_CONFIG))

const rootDir       = path.normalize(path.join(__dirname, '..'))
const paths         = {
    ROOT:           rootDir,
    configs:        path.join(rootDir, 'config'),
    src:            path.join(rootDir, 'app', 'js'),
    build:          path.join(rootDir, 'build'),
    tests:          path.join(rootDir, '__tests__'),
    coverage:       path.join(rootDir, '__coverage__'),
    nodeModules:    path.join(rootDir, 'node_modules')
}

export const getAppConfig = _isDevelopment => {
    const isDevelopment = _isDevelopment || config.get('isDevelopment')

    return {
        isDevelopment,
        paths,

        globs:          {
            scripts:        paths.ROOT          + '/**/*.js',
            src:            paths.src           + '/**/*.js',
            nodeModules:    paths.nodeModules   + '/**',
            testFiles:      paths.tests         + '/**/*.test.{js,jsx}',
            coverage:       paths.coverage      + '/**/*',
            build:          paths.build         + '/**/*'
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
            eslint: './.eslintrc'
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
        ]

    }
}

export default getAppConfig()
