'use strict'

import gulp        from 'gulp'
import runSequence from 'run-sequence'

let fs          = require('fs'),
    onlyScripts = require('./util/script-filter'),
    tasks       = fs.readdirSync('./gulp/tasks/').filter(onlyScripts)

tasks.forEach(task => {
    require('./tasks/' + task)
})

gulp.task('default', cb => runSequence('config', 'webpack', 'browserSync', cb))
