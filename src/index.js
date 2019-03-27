const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    socket.on('join', ({ username, room }) => {
        socket.join(room)
        socket.emit('message', generateMessage('Welcome!'))
        socket.broadcast.to(room).emit('message', generateMessage(`${username} joined!`))
    })
    socket.on('sendMsg', (msg, callback) => {
        const filter = new Filter()

        if (filter.isProfane(msg)) {
            return callback('Profanity is not allowed!')
        }

        io.emit('message', generateMessage(msg))
        callback()
    })

    socket.on('sendLocation', (pos, callback) => {
        io.emit('location', generateLocationMessage(`https://google.com/maps?q=${pos.lat},${pos.long}`))
        callback('Location shared.')
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left.')
    })
})

server.listen(port, () => {
    console.log('Server is up on port ' + port)
})