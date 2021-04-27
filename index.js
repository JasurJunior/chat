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

let users = {}
let mes = []
io.on('connection', (socket)=>
    {
    socket.on('user', msg =>
        {
        mes.push(`<b style="color:green; font-size: 15px">________<b style="color:${msg.color}">${msg.user}</b>: connected________</b>`)
        users[socket.id] = `<b style="color:${msg.color}">${msg.user}</b>`
        io.emit('user',users)
        socket.on('message',()=> io.emit('message',mes) )
        })
    
    socket.on('message', msg =>
        {
        // local date hosting
        const n = 5 // this is the difference in hosting hours
        let hour = new Date().getHours() + n > 10 ? new Date().getHours()+n : '0'+(new Date().getHours()+n)
        let minute = new Date().getMinutes() > 10 ? new Date().getMinutes() : '0'+new Date().getMinutes()
        let second = new Date().getSeconds() > 10 ? new Date().getSeconds() : '0'+new Date().getSeconds()
        let date = `${hour}:${minute}:${second}`
        // end date
        mes.push(`<b style="color:${msg.color}">${msg.user}</b>: ${msg.message}          <mark>${date}</mark>`)
        if(mes.length > 10)
            mes.shift()
        io.emit('message',mes)
        })

    socket.on('disconnect',()=>
        {
        mes.push(`<b style="color:red; font-size: 15px">________${users[socket.id]}: disconnected________</b>`)
        delete users[socket.id]
        io.emit('user',users)
        })
    })

const port = process.env.port || 3000
server.listen(port,'0.0.0.0', () => console.log('http://0.0.0.0:'+port))
