import browserSync from 'browser-sync'
import gulp        from 'gulp'
import appConfig   from '../../../config/appConfig.js'

const {
    ports: {portFE, portBSProxy, portBSUI}
} = appConfig

gulp.task('browserSync', () => {
    return browserSync.init({
        open:   'ui', // ui|local|external|external-ui|false
        proxy:  'http://localhost:' + portFE, // out express server we want to proxy
        port:   portBSProxy, // the proxied express server, tunneled through browserSync
        ui: {
            // the port for the browserSync UI
            port: portBSUI
        }
    })
})
