import gulp 			from 'gulp'
import webpack 		from 'webpack'
import makeBuild 		from '../../webpack/makeBuild'
import makeConfig 	from '../../webpack/makeConfig.js'

const config = makeConfig(global.isProd ? 'production' : 'development')

gulp.task('webpack', makeBuild)