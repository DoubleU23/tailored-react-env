'use strict'

import gulp   from 'gulp'
import config      from '../../config/config.js'

gulp.task('watch', ['browserSync'], () => {
  // Scripts are automatically watched by Watchify inside Browserify task
    gulp.watch(config.styles.src,                 ['sass'])
    gulp.watch(config.images.src,                 ['imagemin'])
    gulp.watch(config.sourceDir + 'index.html',   ['copyIndex'])
})
