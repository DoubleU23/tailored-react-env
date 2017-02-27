import express from 'express'

import frontend from './frontend'
// import api from './api'; // to be done
// import errorHandler from './lib/errorHandler';

import config from '../config/config.js'

const app = express()

// app.use('/api/v1', api);
// app.use(errorHandler);
app.use(frontend)

const {portFE} = config

app.listen(portFE, () => {
  console.log('Server started at port %d', portFE)
})
