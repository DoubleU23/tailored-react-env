import path             from 'path'
import {spawn}          from 'child_process'
import gulp             from 'gulp'
import nodemon          from 'gulp-nodemon'

import webpackMakeBuild from '../../webpack/webpackMakeBuild'
import config           from '../../config/config.js'

gulp.task('webpack', cb => {
  if (process.env.APP_ENV === 'development') {
    const hotServerScriptEntrypoint = path.normalize(path.join(config.rootDir, 'webpack', 'hotserver'))
    const expressServerEntrypoint   = path.normalize(path.join(config.rootDir, 'server'))

    // start webpack hot server
    // const hotServerProcess =
    spawn(
      'node', [hotServerScriptEntrypoint],
      {stdio : 'inherit'} // sends all outputs to parent-process (gulp)
    )

    // start express server
    nodemon({
      script: expressServerEntrypoint,
      ext:    'js jsx html',
      // src changes are handled by webpack hot module replacement
      ignore:  config.sourceDir
    })

    cb()
  } else {
    webpackMakeBuild(cb)
  }
})
