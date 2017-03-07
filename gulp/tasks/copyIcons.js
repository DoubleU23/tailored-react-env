'use strict'

import gulp   from 'gulp'
import config from '../../config/config.js'

gulp.task('copyIcons', () => {
  // Copy icons from root directory to build/
    return gulp.src(['./*.png', './favicon.ico'])
        .pipe(gulp.dest(config.buildDir))
})
