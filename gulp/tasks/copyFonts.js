'use strict'

import gulp   from 'gulp'
import config from '../../config/config.js'

gulp.task('copyFonts', () => {
    return gulp.src([config.sourceDir + 'fonts/**/*'])
        .pipe(gulp.dest(config.buildDir + 'fonts/'))
})
