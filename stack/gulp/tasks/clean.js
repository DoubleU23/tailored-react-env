'use strict'

import gulp      from 'gulp'
import del       from 'del'

import appConfig from '../../../config/appConfig.js'

const {globs} = appConfig

gulp.task('clean', () => del([globs.build, globs.coverage]))
