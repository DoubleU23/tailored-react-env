import path      from 'path'
import gulp      from 'gulp'
import gutil     from 'gulp-util'
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
    }, err => {
        if (err) {
            // avoid formatError
            done(new gutil.PluginError('karma', {
                message: 'Karma Tests failed'
            }))
        }

        process.exit(err || 0)
        done(err || 0)
    }).start()
})
