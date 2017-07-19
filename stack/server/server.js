import express         from 'express'
import frontend        from './frontend'
import api             from './api'
// import api          from './api'; // to be done
// import errorHandler from './lib/errorHandler';

import appConfig       from '../../config/appConfig.js'

const app = express()

app.use('/api', api)

// app.use(errorHandler);
app.use(frontend)

const {ports} = appConfig

app.listen(ports.frontend, () => {
    console.log('Server started at port %d', ports.frontend)
})
