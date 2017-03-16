import path     from 'path'
import gulp     from 'gulp'
import {Server} from 'karma'

import appConfig    from '../../config/appConfig'

const {
    paths
} = appConfig

gulp.task('karma', ['env', 'clean'], done => {
    return new Server({
        configFile: path.join(paths.configs, 'karma.config.js'),
        singleRun: true,
        autoWatch: false
    }, () => {
        done()
    }).start()
})

// gulp.task('karma:watch', done => {
//     return new Server({
//         configFile: path.join(paths.configs, 'karma.config.js'),
//         singleRun: false,
//         autoWatch: true
//     }, () => {
//         done()
//     }).start()
// })
