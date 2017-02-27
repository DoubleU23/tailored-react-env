'use strict';

import gulp        from 'gulp'
import runSequence from 'run-sequence'

gulp.task('default', cb => runSequence('config', 'webpack', cb))
