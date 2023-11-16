const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const castErrorHandler = require('./middlewares/castErrorHandler')
const errorHandler = require('./middlewares/errorHandler')
require('./db/connection')()

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', require('./routes/log.routes'))

app.use(castErrorHandler)
app.use(errorHandler)
module.exports = app
