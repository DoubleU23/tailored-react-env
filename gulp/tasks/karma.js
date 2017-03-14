import path     from 'path'
import gulp     from 'gulp'
import {Server} from 'karma'

import appConfig    from '../../config/appConfig'

const {
    paths
} = appConfig

gulp.task('karma', done => {
    return new Server({
        configFile: path.join(paths.configs, 'karma.config.js'),
        singleRun: true,
        autoWatch: false
    }, () => {
        done()
    }).start()
})
