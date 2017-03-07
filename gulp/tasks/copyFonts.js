'use strict'

import gulp      from 'gulp'
import appConfig from '../../config/appConfig.js'

gulp.task('copyFonts', () => {
    return gulp.src([appConfig.sourceDir + 'fonts/**/*'])
        .pipe(gulp.dest(appConfig.buildDir + 'fonts/'))
})
