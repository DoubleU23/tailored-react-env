'use strict'

import gulp   from 'gulp'
import config from '../../config/config.js'

gulp.task('copyIndex', () => {
    gulp.src(config.sourceDir + 'index.html').pipe(gulp.dest(config.buildDir))
})
