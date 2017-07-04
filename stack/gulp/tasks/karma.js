import path      from 'path'
import gulp      from 'gulp'
import {Server}  from 'karma'

import appConfig from '../../../config/appConfig'

const {
    paths
} = appConfig

gulp.task('karma', ['env', 'clean', 'testServer'], done => {
    return new Server({
        configFile: path.join(paths.configs, 'karma.config.js'),
        singleRun: true,
        autoWatch: false
    }, () => {
        done()
        process.exit(0)
    }).start()
})
