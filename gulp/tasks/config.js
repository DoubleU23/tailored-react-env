'use strict'

import gulp   from 'gulp'
// import gutil  from 'gulp-util'

import yargs  from 'yargs'

/**
 * task 'env'
 *     sets env vars depending gulp's yargs
 *
 *     * ensure "config" is called first, so we don't overwrite env vars already set by "config" module (npm package)
 */
gulp.task('config', () => {
    // refactor?
    // overwrite NODE_ENV per process arg --env
    const args =  yargs.argv
    process.env.NODE_ENV = args.env || process.env.NODE_ENV
})
