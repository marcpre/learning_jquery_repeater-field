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

    const out = {}

    for (const key in obj) {
        const value = obj[key]

        const match = /repeater-group\[([0-9])\]\[([a-z]+)\]/.exec(key)
        const index = match[1]
        const property = match[2]

        out[index] = { ...out[index], [property]: value }
    }

    try {
        Object.keys(out).forEach(async i => {
            await postService.createPost(out[i].titel, out[i].description)
        })
    }
    catch (error) {
        res.status(500)
        res.render('error', {
            message: 'Invalide Post',
            error,
        })
    }

    res.redirect('/')
})

// Start Server
const port = process.env.APP_PORT || 8080
const host = process.env.APP_URL || '0.0.0.0'

app.listen(port, host, () => {
    console.log(`Listening on ${host}:${port}/`)
})

module.exports = app
