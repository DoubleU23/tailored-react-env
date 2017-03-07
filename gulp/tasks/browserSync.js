import browserSync    from 'browser-sync'
import gulp           from 'gulp'
import {getAppConfig} from '../../config/appConfig.js'

const config = getAppConfig()

gulp.task('browserSync', () => {
    browserSync.init({
        proxy:  'http://localhost:8000', // out express server we want to proxy
        port:   config.browserSync.portProxy, // the proxied express server, tunneled through browserSync
        ui: {
            // the port for the browserSync UI
            port: config.browserSync.portUI
        },
        ghostMode: {
            links: false
        }
    })
})
