/**
 * TestServer
 *     express server
 *     to test timeout and different statusCodes
 *
 *
 *  refactor: we use the same code like in productionServer,
 *  just with another path
 *
 *  so we should try to extend/abstract a base-task
 *  or try to pass a param
 */
import gulp      from 'gulp'
import gutil     from 'gulp-util'
import {spawn}   from 'child_process'

import colors    from 'colors'

import appConfig from '../../../config/appConfig'

const {
    isProduction,
    paths
} = appConfig

const closeFn = done => data => {
    gutil.log('test server stopped!')
    done(data)
}

gulp.task('testServer', done => {
    // leftover: refactor: remove it?
    if (isProduction) {
        const {yellow} = colors
        gutil.log(yellow(
            '[Warning] '.bold
        +   "skipped task 'testServer' because NODE_ENV === 'production'"
        ))
        done()
        return
    }

    const runner = spawn('node', [paths.testServer], {cwd: process.cwd()})

    runner.stdout.setEncoding('utf8')

    runner.stdout.on('data', data => gutil.log(data))
    runner.stderr.on('data', err => gutil.log('[testServer->Error] ' + err))

    // // kill server process on gulp exit
    process.on('exit', () => runner.kill())
    // refactor: only fires on error
    // doesn't fire on strg+c
    runner.on('close', closeFn)
    runner.on('exit', closeFn)
})
