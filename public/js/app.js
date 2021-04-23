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
            }
        },
    methods:
        {
        send()
            {
            if(this.userall.indexOf(this.user) === -1 && this.user.length > 1)
                {
                this.userall.unshift(this.user)
                this.cls = 'display:none'

                socket.emit('user', this.user)
                socket.on('user',msg=>
                    {
                    this.userall = msg
                    })
                }
            if(this.message.length > 0)
                {
                socket.emit('message',{user:this.user,message:this.message})
                socket.on('message',msg=>
                    {
                    this.messall = msg
                    this.message = ''
                    })
                }

            if(this.messall.length > 3)
                this.messall.shift()
            }
        },
    })
app.mount('#main')