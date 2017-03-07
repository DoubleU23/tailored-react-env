import gulp       from 'gulp'
import eslint     from 'gulp-eslint'
import plumber    from 'gulp-plumber'
import gulpNotify from 'gulp-notify'

import appConfig  from '../../config/appConfig.js'

gulp.task('lint', () => {
    const src = [`!${appConfig.testFiles}`, '!node_modules/**']
    src.push(
        // also lint env scripts in devMode
        appConfig.isDevelopment ? `${appConfig.rootDir}/**/*.js` : appConfig.scripts.src
    )

    return gulp.src(src)
        .pipe(eslint({appConfig: appConfig.appConfigs.eslint}))
        .pipe(eslint.format())
        .pipe(plumber(gulpNotify.onError('Task "lint"' + '<%= error.message %>'.toLowerCase())))
        .pipe(eslint.failAfterError())
})
