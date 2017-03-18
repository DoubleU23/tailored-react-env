import gulp       from 'gulp'
import eslint     from 'gulp-eslint'
import plumber    from 'gulp-plumber'
import gulpNotify from 'gulp-notify'

import appConfig  from '../../config/appConfig.js'

const {paths, globs}   = appConfig

const src       = [`!${paths.tests}`, `!${globs.coverage}`, `!${globs.nodeModules}`, `!${globs.build}`]

const lintTask = src =>
    gulp.src(src)
        .pipe(plumber(gulpNotify.onError('Task "lint"' + '<%= error.message %>'.toLowerCase())))
        .pipe(eslint({configFile: appConfig.configFiles.eslint}))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .on('error', () =>
            process.exit(1)
        )

// lints your code based on isDevelopment
gulp.task('lint', function() {
    src.push(
        // also lint env scripts in devMode
        appConfig.isDevelopment ? globs.src : globs.scripts
    )
    return lintTask(src)
})

// just lints the apps src
gulp.task('lint:app', () => lintTask(src.concat(globs.scripts)))

// also lints the env code
gulp.task('lint:all', () => lintTask(src.concat(globs.src)))
