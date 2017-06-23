'use strict'

import gulp   from 'gulp'
import yargs  from 'yargs'

/**
 * task 'env'
 *     sets NODE_ENV
 */
gulp.task('env', () => {
    // refactor?
    // overwrite NODE_ENV per process arg --env
    const args =  yargs.argv
    process.env.NODE_ENV = args.env || process.env.NODE_ENV || 'development'
})
