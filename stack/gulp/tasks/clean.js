'use strict'

import gulp      from 'gulp'
import del       from 'del'

import appConfig from '../../../config/appConfig.js'

const {
    globs: {build, coverage}
} = appConfig

gulp.task('clean', () => del([build, coverage]))
