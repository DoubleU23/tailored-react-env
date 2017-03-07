'use strict'

import gulp      from 'gulp'
import del       from 'del'

import appConfig from '../../config/appConfig.js'

gulp.task('clean', () => del([appConfig.buildDir]))
