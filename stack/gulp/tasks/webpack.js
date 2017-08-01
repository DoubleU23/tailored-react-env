import gulp             from 'gulp'
import nodemon          from 'gulp-nodemon'
import gutil            from 'gulp-util'

import webpackMakeBuild from '../../webpack/webpackMakeBuild'
import appConfig        from '../../../config/appConfig.js'

import config           from 'config'

import startDevServer   from '../../webpack/devServer/start.js'

const {
    paths,
    isDevelopment
} = appConfig

gulp.task('webpack', finishTaskFn => {
    // start express server
    // refactor: move path to config!?
    const expressServerEntrypoint  = process.env.EXPRESS_SERVER || paths.server

    if (isDevelopment) {
        let startedFirst = false

        startDevServer(() => { // callback function starts after webpack dev server built
            nodemon({
                script: expressServerEntrypoint,
                ext:    'js jsx html',
                // src changes are handled by webpack hot module replacement
                ignore: paths.src,
                // https://github.com/JacksonGariety/gulp-nodemon#-tasks-array--functionchangedfiles-
                tasks:  ['lint']
            })
                // .on('message', e => {
                //     // TBD: catch child_process stdout to know when it's done!
                //     gutil.log('nodemon.on message', e)
                // })
                .on('start', () => {
                    if (!startedFirst) {
                        // call finishTaskFn only the first time
                        startedFirst = true
                        // refactor: wait until expressServerEntrypoint is mounted
                        // i dont know how to pass "finishTaskFn" to the script
                        // and can't pass a callback function per command-line arguments
                        //
                        // alternatively i would like to call a function with nodemon... instead of a script
                        setTimeout(finishTaskFn, 1500)
                    }
                })
        })
    }
    else {
        webpackMakeBuild(
            // build callback = gulp "done()"
            finishTaskFn
        )
    }
})
