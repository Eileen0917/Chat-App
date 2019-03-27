const socket = io()

socket.on('message', (msg) => {
    console.log(msg)
})

document.querySelector('#msgForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const msg = e.target.elements.msg.value
    socket.emit('sendMsg', msg, (error) => {
        if(error){
            return console.log(error)
        }
        console.log('msg delivered.')
    })
})

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        })
    })
})