import express from 'express';
import path from 'path';
import opn from 'opn';

import Webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';
import getWebpackConfig from '../../../webpack/makeConfig';


const app = express();

const webpackConfig = getWebpackConfig(true); // isDev = true
console.log(webpackConfig);

const webpack = Webpack(webpackConfig);

app.use(webpackDev(webpack, {
	noInfo: true,
	publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHot(webpack));

app.listen(webpackConfig.hotPort, () => {
	console.log('Hot server started at port %d', webpackConfig.hotPort); // eslint-disable-line no-console
});
