import path             from 'path'
import {spawn}          from 'child_process'
import gulp             from 'gulp'
import nodemon          from 'gulp-nodemon'

import webpackMakeBuild from '../../webpack/webpackMakeBuild'
import appConfig           from '../../config/config.js'

import config         from 'config'

gulp.task('webpack', cb => {
  if (config.get('isDevelopment')) {
    const hotServerBuildEntrypoint = path.normalize(path.join(appConfig.rootDir, 'webpack', 'hotserverBuild'))
    const expressServerEntrypoint  = path.normalize(path.join(appConfig.rootDir, 'server'))

    // start webpack hot server
    // const hotServerProcess =
    spawn(
      'node', [hotServerBuildEntrypoint],
      {stdio : 'inherit'} // sends all outputs to parent-process (gulp)
    )

    // start express server
    nodemon({
      script: expressServerEntrypoint,
      ext:    'js jsx html',
      // src changes are handled by webpack hot module replacement
      ignore:  appConfig.sourceDir
    })

    cb()
  } else {
    webpackMakeBuild(cb)
  }
})
