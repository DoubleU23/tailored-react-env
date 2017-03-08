import browserSync    from 'browser-sync'
import gulp           from 'gulp'
import appConfig from '../../config/appConfig.js'

gulp.task('browserSync', () => {
    browserSync.init({
        proxy:  'http://localhost:8000', // out express server we want to proxy
        port:   appConfig.browserSync.portProxy, // the proxied express server, tunneled through browserSync
        ui: {
            // the port for the browserSync UI
            port: appConfig.browserSync.portUI
        },
        ghostMode: {
            links: false
        }
    })
})
