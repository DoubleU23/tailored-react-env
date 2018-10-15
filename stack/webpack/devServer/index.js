if (process.env.NODE_ENV === 'production') {
    throw new Error('Do not start webpack hot reload server in production environment. You are likely using wrong gulp task')
}

require('@babel/register')()

require('./start.js')
