require('dotenv').config()
const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

const index = require('./routes/index')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(logger(process.env.LOG_ENV))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false,
}))
app.use(express.static(path.join(__dirname, '/../public')))
app.use(cookieParser())

// routes
app.use('/', index)

// Start Server
const port = process.env.APP_PORT || 8080
const host = process.env.APP_URL || '0.0.0.0'

app.listen(port, host, () => {
  console.log(`Listening on ${host}:${port}/login`)
})

module.exports = app
