require('dotenv').config()
const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const postService = require('./services/posts')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(logger(process.env.LOG_ENV))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false,
}))
app.use(express.static(path.join(__dirname, '/../public/')))
app.use(cookieParser())

// routes
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/new', async(req, res) => {
  const obj = req.body
  console.log(req.body)
  const desc = 'undefined'
  const titel = 'undefined'
  let i = 1
  for (const k in obj) {
    const item = obj[k]

    if (k === `repeater-group[${i}][titel]`) {
      this.titel = item
    }
    if (k === `repeater-group[${i}][description]`) {
      this.desc = item
    }
    if (this.titel != 'undefined' && this.desc != 'undefined') {
      try {
        await postService.createPost(titel, desc)
      } catch (error) {
        res.status(500)
        res.render('error', {
          message: 'Invalide Post',
          error,
        })
      }
    }

    i += 1
  }
  res.redirect('/')
})

// Start Server
const port = process.env.APP_PORT || 8080
const host = process.env.APP_URL || 'localhost'

app.listen(port, host, () => {
  console.log(`Listening on ${host}:${port}/`)
})

module.exports = app
