const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

app.use('/public',express.static('public'))

app.get('/', (req, res) =>
    {
    res.sendFile(__dirname + '/index.html')
    })

let users = []
let userId = []
let mes = []
io.on('connection', (socket)=>
    {
    userId.push(socket)
    socket.on('user', msg =>
        {
        users.push(`<b style="color:${msg.color}">${msg.user}</b>`)
        io.emit('user',users)
        })
    
    socket.on('message', msg =>
        {
        let date = new Date().toLocaleTimeString()
        mes.unshift(`<b style="color:${msg.color}">${msg.user}</b>: ${msg.message}          <mark>${date}</mark>`)
        if(mes.length > 20)
            mes.pop()
        io.emit('message',mes)
        })

    socket.on('disconnect',()=>
        {
        let idx = userId.indexOf(socket)
        users.splice(idx,1)
        io.emit('user',users)
        })
    })

server.listen(3000,'0.0.0.0', () => console.log('http://0.0.0.0:3000'))