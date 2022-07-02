const fs = require('fs'),
      express = require('express'),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      logger = require('morgan');

var app = express(),
    router = require('./router.js'); 

function start () {

    cinf('  Public paths:', 
                fs.readdirSync('./public')
                    .map(p => `/${p}`))
    
    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(express.static(path.join(__dirname, 'public')))
    app.use('/', router)
}

module.exports = { app, run: start }