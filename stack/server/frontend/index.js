import compression from 'compression'
// import device from 'express-device'
// import tailoredMiddleware from '../lib/tailoredMiddleware';
import express from 'express'
// import favicon from 'serve-favicon';
import render from './render'

const app = express()

// app.use(tailoredMiddleware());
// app.use(compression())

// app.use(favicon('assets/img/favicon.ico'));

// // Serve the static assets. We can cache them as they include hashes.
// // express.static is relative to the directory where you launch your node process
// app.use('/assets/img', express.static('assets/img', {maxAge: '200d'}));
// // fonts - cached
// app.use('/assets/fonts', express.static('assets/fonts', {maxAge: '200d'}));
// app.use('/_assets', express.static('build', {maxAge: '200d'}));

// // Intl.
// app.use('/node_modules/intl/dist', express.static('node_modules/intl/dist'));
// app.use('/node_modules/intl/locale-data', express.static('node_modules/intl/locale-data'));

// app.use(device.capture());
//

app.use('/build', express.static('build', {maxAge: '200d'}))

// app.use('/test', function(req, res, next) {
//     res.send('HALLO!')
// })

app.get('*', render)

app.on('mount', () => {
    console.log('App is available at %s', app.mountpath)
})

export default app
