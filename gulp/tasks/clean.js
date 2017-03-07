'use strict'

import gulp   from 'gulp'
import del    from 'del'
import config from '../../config/config.js'

gulp.task('clean', () => del([config.buildDir]))
