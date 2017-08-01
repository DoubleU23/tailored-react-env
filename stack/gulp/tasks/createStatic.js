'use strict'

import fs                     from 'fs'
import path                   from 'path'
import gulp                   from 'gulp'
import runSequence            from 'run-sequence'

import getStaticIndexHtml     from '../../static/getStaticIndexHtml'
import getAssetFilenamesAsync from '../../static/getAssetFilenamesAsync'

import appConfig              from '../../../config/appConfig.js'

const {
    paths:  {build: buildPath}
} = appConfig

gulp.task('static:createIndexHtml', async done => {
    const assetFileNames    = await getAssetFilenamesAsync(true)
    const indexHtml         = getStaticIndexHtml(assetFileNames)

    fs.writeFile(
        path.resolve(buildPath, 'index.html'),
        indexHtml,
        err => err && done(err)
    )
})

// TBD: https://www.npmjs.com/package/opn
// open file:// url
// if !CONTINIOUS_INTEGRATION
//
// gulp.task('static:open', () => {
// })


gulp.task('static', done => {
    runSequence(
        'static:createIndexHtml',
        done
    )
})
