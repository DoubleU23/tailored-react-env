import path     from 'path'

import express  from 'express'
import auth     from 'http-auth'

import cors     from 'cors'

// TBD: refactor: use this to dynamicly create static api routes!?
// see comments in ./fixtures
import fixtures    from './fixtures/'

const api = express()

// CROSS ORIGIN ALLOW ALL
api.use(cors())

// APPLY BASIC AUTH
// user:    admin
// pw:      admin
const basicAuth = auth.basic({
    realm:  'TestLogin (admin/admin)',
    file:   path.join(__dirname, 'htpasswd')
})
api.use(auth.connect(basicAuth))

// DYNAMIC api route
// gets subObject of fixtures
// TBD: fix dynamic "fixtures"
api.get('/:endpoint', (req, res, next) => {
    const endpoint = req.params.endpoint
    if (endpoint === '' || endpoint == null) {
        res.status(404).send('404 - Not Found')
    }

    if (typeof fixtures[endpoint] !== 'object') {
        // refactor: status/errorMessage?
        res.status(404).send('404 - Not Found')
    }
    else {
        res.set('Content-Type', 'application/json; charset=utf-8')
        res.send(JSON.stringify(fixtures[endpoint]))
    }
})

api.on('mount', () => {
    let output   = ''
    output      += 'API available at ' + api.mountpath + '\n'
    output      += 'Available Endpoints: ' + '\n'
    Object.keys(fixtures).forEach(endpoint => {
        output  += '* /api/' + endpoint
    })

    console.log(output)
})

export default api
