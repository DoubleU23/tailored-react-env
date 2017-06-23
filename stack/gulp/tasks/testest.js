import gulp      from 'gulp'
import mocha     from 'gulp-mocha'
import {expect} from 'chai'
// import mochaBase from 'mocha'

import gjc       from 'gulp-jsx-coverage'
// import istanbul  from 'gulp-babel-istanbul'
import istanbul  from 'gulp-istanbul'
import tap from 'gulp-tap'

import appConfig from '../../../config/appConfig.js'

const {
    paths,
    globs
} = appConfig

gulp.task('testest', () => {
    // return (gjc.createTask({
    //     src:    [paths.tests + '/helper.js', paths.tests + '/test/index.js'],
    //     mocha:  {
    //         reporter: 'nyan',
    //         assertion: 'chai'
    //     },
        // istanbul: {
            // coverageVariable: '__MY_TEST_COVERAGE__',
            // exclude: /node_modules|__tests__|build|gulp|testHelpers/
        // },
    //     coverage: {
            // reporters: ['text-summary', 'html'],
            // directory: '__coverage__/'
    //     },

    //     babel: {
    //         sourceMap: 'both'
    //     },
    //     transpile: {
    //         babel: {
    //             include: /\.jsx?$/,
    //             exclude: /node_modules/
    //         }
    //     }
    // }))()
    // require(paths.tests + '/helper.js')
    // return gulp.src(globs.tests)

    // global.expect = expect

    return gulp.src(paths.tests + '/test/firstTest.js')
        .pipe(istanbul({
            // includeUntested: false
        }))
        // i don't know what this does..
        // the example said: "This overwrites `require` so it returns covered files"
        .pipe(istanbul.hookRequire())
        .on('finish', () => {
            gulp.src([paths.tests + '/setup.js', paths.tests + '/test/firstTest.js'])
                .pipe(mocha({
                    reporter:   'spec', // 'nyan',
                    assertion:  'chai',
                    // ignoreLeaks: false,
                    // require:        [paths.tests + '/setup.js'],
                    globals: {
                        sinon:      require('sinon')
                    }
                }))
                .pipe(istanbul.writeReports({
                    reporters:  ['json', 'text-summary', 'html'],
                    dir:        '__coverage__/',
                    exclude: /node_modules|build|gulp|testHelpers/
                }))
        })

//     gulp.src([paths.tests + '/setup.js', paths.tests + '/test/index.js'])
//         .pipe(mocha({
//             reporter:   'spec', // 'nyan',
//             assertion:  'chai',
//             // ignoreLeaks: false,
//             // require:        [paths.tests + '/setup.js'],
//             globals: {
//                 sinon:      require('sinon')
//             }
//         }))
//         .pipe(istanbul.writeReports({
//             reporters:  ['text-summary', 'html'],
//             dir:        '__coverage__/',
//             exclude: /node_modules|__tests__|build|gulp|testHelpers/
//         }))
//
//
})
