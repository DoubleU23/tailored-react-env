import gulp       from 'gulp'
import eslint     from 'gulp-eslint'
import gulpNotify from 'gulp-notify'
import plumber    from 'gulp-plumber'

import config     from '../../config/config.js'

gulp.task('lint', () =>
  // process.env.NODE_ENV !== 'development'
  gulp.src([config.scripts.src, config.testFiles, './*.js', '!node_modules/**'])
    .pipe(eslint({config: config.configs.eslint}))
    .pipe(eslint.format())
    .pipe(plumber(gulpNotify.onError('Task "lint"' + '<%= error.message %>'.toLowerCase())))
    .pipe(eslint.failAfterError())
)
