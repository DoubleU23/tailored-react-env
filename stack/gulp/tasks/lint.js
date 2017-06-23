import colors     from 'colors'

import gulp       from 'gulp'
import gulpIf     from 'gulp-if'
import eslint     from 'gulp-eslint'
import plumber    from 'gulp-plumber'
import gulpNotify from 'gulp-notify'

import appConfig  from '../../../config/appConfig.js'

const {paths, globs}   = appConfig

const src       = [`!${paths.tests}`, `!${globs.coverage}`, `!${globs.nodeModules}`, `!${globs.build}`]

const lintTask = (src, done) => {
    let esLintOutputPrefix

    if (process.env.DEBUG) {
        // TBD: enhance debug output...
        // find pattern, define debug style, etc, ...
        esLintOutputPrefix = '[ESLint] '.green.bold

        console.log(esLintOutputPrefix + ('configFile: '.bold + appConfig.configFiles.eslint).green)
        console.log(esLintOutputPrefix + 'src definition:'.green.bold)
        console.dir(src)
        console.log(esLintOutputPrefix + 'started ...'.green.bold)
    }
    return gulp.src(src)
        // if not in CI env - gulpNotify onError
        .pipe(gulpIf(!appConfig.isCI, plumber(gulpNotify.onError('Task "lint"' + '<%= error.message %>'.toLowerCase()))))

        .pipe(eslint({configFile: appConfig.configFiles.eslint}))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .on('error', () => process.exit(1))
        //
        // .on('finish', () => done())
        // => Error: task completion callback called too many times
}

// lints your code based on isDevelopment
gulp.task('lint', function(done) {
    src.push(
        // also lint env scripts in devMode
        appConfig.isDevelopment &&
        process.env.NODE_ENV !== 'test' // check env code too in travis-CI
            ? globs.src
            : globs.scripts
    )
    return lintTask(src, done)
})

// just lints the apps src
gulp.task('lint:all', done => lintTask(src.concat(globs.scripts), done))

// also lints the env code
gulp.task('lint:app', done => lintTask(src.concat(globs.src), done))
