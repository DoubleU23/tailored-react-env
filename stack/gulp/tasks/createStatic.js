'use strict'

import fs                     from 'fs'
import path                   from 'path'
import gulp                   from 'gulp'
import runSequence            from 'run-sequence'

import getStaticIndexHtml     from '../../static/getStaticIndexHtml'
import getAssetFilenamesAsync from '../../static/getAssetFilenamesAsync'

import appConfig              from '../../../config/appConfig.js'

const {
    globs:  {build:  buildGlob},
    paths:  {static: staticPath}
} = appConfig

gulp.task('static:copyBuildFiles', () => {
    return gulp.src([buildGlob])
        .pipe(gulp.dest(staticPath))
})

gulp.task('static:createTemplate', async done => {
    const assetFileNames    = await getAssetFilenamesAsync(true)
    const indexHtml         = getStaticIndexHtml(assetFileNames)

    fs.writeFile(
        path.resolve(staticPath, 'index.html'),
        indexHtml,
        err => err && done(err)
    )
})

gulp.task('static', done => {
    runSequence(
        // 'clean:static', // 'clean' is already called in default task sequence'
        'static:copyBuildFiles',
        'static:createTemplate',
        done
    )
})
