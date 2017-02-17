'use strict'

import gulp   from 'gulp'
import gutil  from 'gulp-util'

import yargs  from 'yargs'

// import config from '../config'
/**
 * task 'env'
 *     sets env vars depending gulp's yargs
 *
 *     * ensure "config" is called first, so we don't overwrite env vars already set by "config" module (npm package)
 */
gulp.task('config', () => {
  // set NODE_ENV per yargs (if not set)
  process.env.NODE_ENV    = (process.env.NODE_ENV ||  yargs.default('env', 'development').argv.env)

  // after we set NODE_ENV we can load the corresponding config.yml
  const config            = require('config')

  // now we can set the defaults for our args as we defined them for the running environment
  const args              = yargs
    // NODE_ENV="production" (else "development")
    .alias('p', 'production')
    // (frontend) port on which it's deployed
    .default('port', config.get('PORT'))
    .argv

  process.env.PORT        = process.env.PORT || args.port

  process.env.APP_ENV     = process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development'
    ? 'development'
    : 'production'

  console.log('PORT: '      + process.env.PORT)
  console.log('NODE_ENV: '  + process.env.NODE_ENV)
  console.log('APP_ENV: '   + process.env.APP_ENV)
})
