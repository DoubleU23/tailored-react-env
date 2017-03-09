'use strict'

import gulp   from 'gulp'
// import gutil  from 'gulp-util'

// import yargs  from 'yargs'

// import config from '../config'
/**
 * task 'env'
 *     sets env vars depending gulp's yargs
 *
 *     * ensure "config" is called first, so we don't overwrite env vars already set by "config" module (npm package)
 */
gulp.task('config', () => {
    console.log('gulp\'s yargs injection to process.env not longer used!')
})
