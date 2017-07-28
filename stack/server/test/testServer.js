import express         from 'express'
// import errorHandler from './lib/errorHandler';

import api             from '../api'

import appConfig       from '../../../config/appConfig.js'

const app = express()

// enable API calls on testServer
app.use(api)

app.get('/test/testTimeout', (req, res, next) => {
    setTimeout(() => {
        res.send('timeout response after 5000ms')
    }, 30000)
})

app.get('/test/test401', (req, res, next) => {
    res.status(401).send('401 testServer response')
})

app.get('/test/test500', (req, res, next) => {
    res.status(500).send('500 testServer response')
})

const {ports: {portHMR}} = appConfig

app.listen(portHMR, () => {
    console.log('Server started at port %d', portHMR)
})
