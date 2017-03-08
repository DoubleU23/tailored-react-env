'use strict'

import path from 'path'

export const getAppConfig = _isDevelopment => {
    const isDevelopment = _isDevelopment || process.env.APP_ENV === 'development'

    console.log('isDevelopment', process.env.APP_ENV)

    return {
        isDevelopment,

        portFE:   process.env.PORT_FRONTEND,
        portHMR:  8080,

        browserSync:     {
            portUI:     3001,
            portProxy:  8001
        },

        scripts: {
            src: './app/js/**/*.js',
            dest: './build/js/'
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

        rootDir:  path.normalize(path.join(__dirname, '..')),

        sourceDir: path.normalize(path.join(__dirname, '..', 'app')),

        buildDir: './build/',

        testFiles: './__tests__/**/*.test.{js,jsx}',

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
