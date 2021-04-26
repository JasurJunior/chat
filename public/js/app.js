// socket
const socket = io()

// vue3.js
const app = Vue.createApp(
    {
    data()
        {
        return{
            user:'',
            message:'',
            userall:[], // all user name
            messall:[], // all message
            cls:'display:block',
            color: '',
            }
        },
    methods:
        {
        send()
            {
            if(this.user.length > 1)
                {
                this.cls = 'display:none'

                socket.emit('user', {user:this.user,color:this.color})
                socket.on('user',msg=>
                    {
                    this.userall = Object.values(msg)
                    console.log(this.userall)
                    })
                }
            },
        sendMes()
            {
            if(this.message.length > 0)
                {
                socket.emit('message',{user:this.user,message:this.message,color:this.color})
                socket.on('message',msg=>
                    {
                    this.messall = msg
                    this.message = ''
                    })
                }

            if(this.messall.length > 3)
                this.messall.shift()
            },
        },
    })
app.mount('#main')