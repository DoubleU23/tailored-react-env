// import url         from 'url'
import browserSync from 'browser-sync'
import gulp        from 'gulp'
import {getConfig}   from '../../config/config.js'

const config = getConfig()

gulp.task('browserSync', () => {
    console.log('browserSync starting...')

    // const DEFAULT_FILE = 'index.html'
    // const ASSET_EXTENSION_REGEX = new RegExp(`\\b(?!\\?)\\.(${config.assetExtensions.join('|')})\\b(?!\\.)`, 'i')

    browserSync.init({
   /* server: {
      baseDir: config.buildDir,
      middleware: function(req, res, next) {
        let fileHref = url.parse(req.url).href

        if (!ASSET_EXTENSION_REGEX.test(fileHref)) {
          req.url = '/' + DEFAULT_FILE
        }

        return next()
      }
    }, */
        port: 8001,
        proxy: 'http://localhost:8000',
        ui: {
            port: config.UIPort
        },
        ghostMode: {
            links: false
        }
    })
})

