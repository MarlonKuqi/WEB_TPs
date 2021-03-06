const express = require('express')
const bodyParser = require('body-parser');
const helmet = require('helmet')

const alertRouter = require('./routes/alerts-v1')
const alertsModel = require('./model/alerts')
const database = require('./database')

const app = express()

app.use(bodyParser.json())
app.use(helmet({noSniff: true}))

database._connect()

app.use('/v1/alerts', alertRouter(alertsModel))

// For unit tests
exports.app = app