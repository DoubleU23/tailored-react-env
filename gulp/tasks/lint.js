import gulp       from 'gulp'
import eslint     from 'gulp-eslint'
import plumber    from 'gulp-plumber'
import gulpNotify from 'gulp-notify'

import appConfig  from '../../config/appConfig.js'

const {paths, globs}   = appConfig
// src preset with ignorepatterns
const src       = [`!${paths.tests}`, `!${globs.coverage}`, `!${globs.nodeModules}`, `!${globs.build}`]

const lintTask = src =>
    gulp.src(src)
        .pipe(eslint({configFile: appConfig.configFiles.eslint}))
        .pipe(eslint.format())
        .pipe(plumber(gulpNotify.onError('Task "lint"' + '<%= error.message %>'.toLowerCase())))
        .pipe(eslint.failAfterError())

gulp.task('lint', () => {
    src.push(
        // also lint env scripts in devMode
        appConfig.isDevelopment ? globs.src : globs.scripts
    )
    return lintTask(src)
})

// lint ALL code - also the environment (like server, webpack, configs, ...)
gulp.task('lint:all', () => lintTask(src.concat(globs.src)))

// just lints the apps js
gulp.task('lint:app', () => lintTask(src.concat(globs.scripts)))
