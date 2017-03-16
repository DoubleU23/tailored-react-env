import gulp       from 'gulp'
import eslint     from 'gulp-eslint'
import plumber    from 'gulp-plumber'
import gulpNotify from 'gulp-notify'

import appConfig  from '../../config/appConfig.js'

gulp.task('lint', ['env'], () => {
    const {globs}   = appConfig

    const src       = [`!${globs.testFiles}`, `!${globs.coverage}`, `!${globs.nodeModules}`, `!${globs.build}`]
    src.push(
        // also lint env scripts in devMode
        appConfig.isDevelopment ? globs.scripts : globs.src
    )

    return gulp.src(src)
        .pipe(eslint({configFile: appConfig.configFiles.eslint}))
        .pipe(eslint.format())
        .pipe(plumber(gulpNotify.onError('Task "lint"' + '<%= error.message %>'.toLowerCase())))
        .pipe(eslint.failAfterError())
})
