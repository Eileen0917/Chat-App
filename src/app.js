const express = require('express')
conat path = require('path')
//require('./db/mongoose')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.render('index')
})

module.exports = app