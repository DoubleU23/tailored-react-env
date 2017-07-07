import gulp          from 'gulp'
import gutil         from 'gulp-util'
import {spawn} from 'child_process'

import colors        from 'colors'

import appConfig     from '../../../config/appConfig'

const {
    isDevelopment,
    paths
} = appConfig

const closeFn = done => data => {
    gutil.log('production server stopped!')
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

    const runner = spawn('node', [paths.server], {
        cwd: process.cwd(),
        env: process.env
    })

    runner.stdout.setEncoding('utf8')

    runner.stdout.on('data', data => gutil.log(data))
    runner.stderr.on('data', err => gutil.log('[productionServer->Error] ' + err))

    // // kill server process on gulp exit
    process.on('exit', () => runner.kill())
    // refactor: only fires on error
    // doesn't fire on strg+c
    runner.on('close', closeFn)
    runner.on('exit', closeFn)
})
