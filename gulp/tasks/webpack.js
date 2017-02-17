import gulp             from 'gulp'
import webpackMakeBuild from '../../webpack/webpackMakeBuild'

gulp.task('build', cb => {
  if (process.env.APP_ENV === 'development') {
    console.log('TBD - start webpack dev server')
  } else {
    webpackMakeBuild(cb)
  }
})
