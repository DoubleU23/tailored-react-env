import gulp             from 'gulp'
import gutil            from 'gulp-util'
import webpack          from 'webpack'
import webpackGetConfig from '../../webpack/webpackGetConfig.js'
import webpackMakeBuild from '../../webpack/webpackMakeBuild'

import gulpNotify       from 'gulp-notify'

// tbd: add gulp-notify//node-notify
gulp.task('webpack', webpackMakeBuild)
