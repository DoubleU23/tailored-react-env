import path             from 'path'
import gulp             from 'gulp'
import nodemon          from 'gulp-nodemon'

import webpackMakeBuild from '../../webpack/webpackMakeBuild'
import appConfig        from '../../config/appConfig.js'

import config           from 'config'

import startDevServer   from '../../webpack/devServer/start.js'

const {
    paths
} = appConfig

gulp.task('webpack', finishTaskFn => {
    if (config.get('isDevelopment')) {
    // const hotServerBuildEntrypoint = path.normalize(path.join(appConfig.rootDir, 'webpack', 'hotserverBuild'))

        // start express server
        // refactor: move path to config!?
        const expressServerEntrypoint  = path.normalize(path.join(paths.ROOT, 'server'))

        let startedFirst = false

        startDevServer(() => { // callback function starts after webpack dev server built
            nodemon({
                script: expressServerEntrypoint,
                ext:    'js jsx html',
                // src changes are handled by webpack hot module replacement
                ignore: paths.src,
                tasks:  ['lint']
            })
                .on('start', () => {
                    if (!startedFirst) {
                        // call finishTaskFn only the first time
                        startedFirst = true
                        // TBD: wait until expressServerEntrypoint is mounted
                        // i dont know how to pass "finishTaskFn" to the script
                        // and can't pass a callback function per command-line arguments
                        //
                        // alternatively i would like to call a function with nodemon... instead of a script
                        setTimeout(finishTaskFn, 1500)
                    }
                })
        })
    } else {
        webpackMakeBuild(finishTaskFn)
    }
})
