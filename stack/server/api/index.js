import path    from 'path'

import express from 'express'
import auth    from 'http-auth'

import items   from './items'

// import appConfig       from '../../../config/appConfig.js'

const api = express()

// APPLY BASIC AUTH
// user:    admin
// pw:      admin
const basicAuth = auth.basic({
    realm:  'TestLogin (admin/admin)',
    file:   path.join(__dirname, 'htpasswd')
})
api.use(auth.connect(basicAuth))

api.get('/items', (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8')
    res.send(JSON.stringify(items))
})

export default api
