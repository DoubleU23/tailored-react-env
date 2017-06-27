import browserSync from 'browser-sync'
import gulp        from 'gulp'
import appConfig   from '../../../config/appConfig.js'

gulp.task('browserSync', () => {
    if (appConfig.isDevelopment) {
        return browserSync.init({
            open:   'ui', // local | external | external-ui | false
            proxy:  'http://localhost:8000', // out express server we want to proxy
            port:   appConfig.browserSync.portProxy, // the proxied express server, tunneled through browserSync
            ui: {
                // the port for the browserSync UI
                port: appConfig.browserSync.portUI
            }
        })
    }
})