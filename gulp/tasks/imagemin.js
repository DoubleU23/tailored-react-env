'use strict';

import gulp        from 'gulp';
import gulpif      from 'gulp-if';
import imagemin    from 'gulp-imagemin';
import browserSync from 'browser-sync';
import config      from '../config';

gulp.task('imagemin', function() {

  // Run imagemin task on all images
  return gulp.src(config.images.src)
    .pipe(gulpif(global.isProd, imagemin()))
    .pipe(gulp.dest(config.images.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));

});
