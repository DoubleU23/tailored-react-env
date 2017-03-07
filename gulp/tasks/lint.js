import gulp       from 'gulp'
import eslint     from 'gulp-eslint'
import plumber    from 'gulp-plumber'
import gulpNotify from 'gulp-notify'

import config     from '../../config/config.js'

gulp.task('lint', () => {
    const src = [`!${config.testFiles}`, '!node_modules/**']
    src.push(
        // also lint env scripts in devMode
        config.isDevelopment ? `${config.rootDir}/**/*.js` : config.scripts.src
    )

    return gulp.src(src)
        .pipe(eslint({config: config.configs.eslint}))
        .pipe(eslint.format())
        .pipe(plumber(gulpNotify.onError('Task "lint"' + '<%= error.message %>'.toLowerCase())))
        .pipe(eslint.failAfterError())
})
