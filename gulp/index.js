'use strict'

import gulp        from 'gulp'
import runSequence from 'run-sequence'

let fs          = require('fs'),
    onlyScripts = require('./util/script-filter'),
    tasks       = fs.readdirSync('./gulp/tasks/').filter(onlyScripts)

// run config before importing/requiring the other tasks
// because they import appConfig which depends on config-module
require('./tasks/config.js')
runSequence('config') // = sets NODE_ENV based on --env

tasks.forEach(task => {
    require('./tasks/' + task)
})

gulp.task('default', cb => runSequence('config', 'webpack', 'browserSync', cb))
