'use strict'

import gulp      from 'gulp'
import appConfig from '../../config/appConfig.js'

gulp.task('copyIndex', () => {
    gulp.src(appConfig.sourceDir + 'index.html').pipe(gulp.dest(appConfig.buildDir))
})
