'use strict';

import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('default', function(cb) {

  cb = cb || function() {};

  global.isProd = false;

  // Run all tasks once
  return runSequence(['sass', 'imagemin', 'browserify', 'copyFonts', 'copyIndex', 'copyIcons'], 'watch', cb);

});