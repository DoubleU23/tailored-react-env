'use strict'

import gulp            from 'gulp'
import runSequence     from 'run-sequence'
import gulpTaskListing from 'gulp-task-list'

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

// TBD: gulp task list
//
// require('gulp-task-list')(gulp, null, [__filename, ...tasks.map(filename => 'gulp/tasks/' + filename)])
// gulp.task('default', cb => runSequence('task-list'))

gulp.task('default', done => {
    const taskList = ['env', 'clean', 'webpack']

    if (!process.env.BUILD_STATIC) { // refactor: dont use process vars... ONLY CONFIG-MODULE!
        taskList.push('productionServer', 'browserSync')
    }
    else {
        taskList.push('static')
    }

    runSequence(...taskList, done)
})
