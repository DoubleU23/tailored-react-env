#!/usr/bin/env node
'use strict'

const path = require('path')

require('babel-register')({
    ignore: path.normalize(path.resolve(__dirname, '../../node_modules'))
})
require('babel-polyfill')

require('./server.js')
