const express = require('express')
const http = require('http')
const path = require('path')
//require('./db/mongoose')

const app = express()
const server = http.createServer(app)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../src/views')

app.use(express.static(publicDirectoryPath))

server.listen(port, () => {
    console.log('Server is up on port ' + port)
})