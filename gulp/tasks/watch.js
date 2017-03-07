'use strict'

import gulp      from 'gulp'
import appConfig from '../../config/appConfig.js'

gulp.task('watch', ['browserSync'], () => {
  // Scripts are automatically watched by Watchify inside Browserify task
    gulp.watch(appConfig.styles.src,                 ['sass'])
    gulp.watch(appConfig.images.src,                 ['imagemin'])
    gulp.watch(appConfig.sourceDir + 'index.html',   ['copyIndex'])
})
