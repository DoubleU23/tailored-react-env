import express         from 'express'
import frontend        from './frontend'
import api             from './api'
// import api          from './api'; // to be done
// import errorHandler from './lib/errorHandler';

import appConfig       from '../../config/appConfig.js'

const {ports: {portFE}} = appConfig
const app               = express()

app.use('/api', api)

// app.use(errorHandler);
app.use(frontend)


app.listen(portFE, () => {
    console.log('Server started at port %d', portFE)
})
