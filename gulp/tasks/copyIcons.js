'use strict'

import gulp      from 'gulp'
import appConfig from '../../config/appConfig.js'

gulp.task('copyIcons', () => {
  // Copy icons from root directory to build/
    return gulp.src(['./*.png', './favicon.ico'])
        .pipe(gulp.dest(appConfig.buildDir))
})
