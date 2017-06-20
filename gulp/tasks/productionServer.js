import path          from 'path'

import gulp          from 'gulp'
import nodemon       from 'gulp-nodemon'
import gutil         from 'gulp-util'
import {exec, spawn} from 'child_process'

import colors        from 'colors'

import appConfig     from '../../config/appConfig'

const {
    isDevelopment,
    paths
} = appConfig

const closeFn = done => data => {
    gutil.log('production server stopped!')
    console.log('closed!')
    done(data)
}

gulp.task('productionServer', done => {
    // leftover: refactor: remove it?
    if (isDevelopment) {
        const {yellow} = colors
        gutil.log(yellow(
            '[Warning] '.bold
        +   "skipped task 'productionServer' because NODE_ENV !== 'production'"
        ))
        done()
        return
    }

    const runner = spawn('node', [paths.ROOT + '/server/index.js'], {cwd: process.cwd()})

    runner.stdout.setEncoding('utf8')

    runner.stdout.on('data', data => gutil.log(data))

    // kill server process on gulp exit
    process.on('exit', () => runner.kill())
    // refactor: only fires on error
    // doesn't fire on strg+c
    runner.on('close', closeFn(done))
    runner.on('exit', closeFn(done))
})


// gulp.task('productionServer', done => {
//     // 'node ' + paths.ROOT + '/server/index.js'
//     exec('ping localhost', (err, stdout, stderr) => {
//         if (err || stderr) {
//             stderr  && console.log('[Error] ', stderr)
//             err     && console.log('[Error] ', err)
//         }
//         console.log(stdout)
//         done(err)
//     })
// })

// gulp.task('productionServer', () => {
//     return gulp
//         .src(paths.ROOT + '/server/index.js')
//         .pipe(gulpShell([
//             'node <%= file.path %>'
//         ]))
// })
