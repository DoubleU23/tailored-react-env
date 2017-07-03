import express         from 'express'
// import errorHandler from './lib/errorHandler';

import appConfig       from '../../../config/appConfig.js'

const app = express()

app.get('/testTimeout', (req, res, next) => {
    setTimeout(() => {
        res.send('timeout response after 5000ms')
    }, 5000)
})

app.get('/test401', (req, res, next) => {
    res.status(401).send('401 testServer response')
})

app.get('/test500', (req, res, next) => {
    res.status(500).send('500 testServer response')
})

const {ports} = appConfig

app.listen(ports.frontend, () => {
    console.log('Server started at port %d', ports.frontend)
})
