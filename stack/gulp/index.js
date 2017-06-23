'use strict'

import gulp            from 'gulp'
import gulpTaskListing from 'gulp-task-list'
import runSequence     from 'run-sequence'

let fs          = require('fs'),
    onlyScripts = require('./util/script-filter.helper.js'),
    tasks       = fs.readdirSync('./stack/gulp/tasks/').filter(onlyScripts)

// run config before importing/requiring the other tasks
// because they import appConfig which depends on config-module
require('./tasks/env.js')
runSequence('env') // = sets NODE_ENV based on --env

tasks.forEach(task => {
    require('./tasks/' + task)
})

// require('gulp-task-list')(gulp, null, [__filename, ...tasks.map(filename => 'gulp/tasks/' + filename)])
// gulp.task('default', cb => runSequence('task-list'))

gulp.task('default', cb => runSequence('env', 'webpack', 'productionServer', 'browserSync', cb))
