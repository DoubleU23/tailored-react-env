'use strict'

import config     from '../config'

import gulp       from 'gulp'
import eslint     from 'gulp-eslint'

import plumber    from 'gulp-plumber'
import gulpNotify from 'gulp-notify'

gulp.task('lint', () =>
  // process.env.NODE_ENV !== 'development'
  gulp.src([config.scripts.src, config.testFiles, './*.js', '!node_modules/**'])
    .pipe(eslint({config: config.configs.eslint}))
    .pipe(eslint.format())
    .pipe(plumber(gulpNotify.onError('Task "lint"' + '<%= error.message %>'.toLowerCase())))
    .pipe(eslint.failAfterError())
)
