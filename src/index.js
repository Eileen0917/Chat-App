const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    socket.emit('message', 'Welcome!')
    // socket.broadcast.emit('message', 'A new user joined!')
    
    socket.on('sendMsg', (msg, callback) => {
        io.emit('message', msg)
        callback('Delivered.')
    })

    // socket.on('disconnect', () => {
    //     io.emit('message', 'A user has left.')
    // })

    // socket.on('sendLocation', (pos) => {
    //     io.emit('message', `https://google.com/maps?q=${pos.lat},${pos.long}`)
    // })
})

server.listen(port, () => {
    console.log('Server is up on port ' + port)
})