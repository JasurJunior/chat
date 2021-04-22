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
            cls:false,
            // like
            like: 0,
            dislike:0
            //end like
            }
        },
    methods:
        {
        //like
        likeFun()
            {
            if(this.like == 0) this.like++
            else this.like--
            },
        dislikeFun()
            {
            if(this.dislike == 0) this.dislike++
            else this.dislike--
            },
        // end like
        send()
            {
            if(this.userall.indexOf(this.user) === -1 && this.user.length > 3)
                {
                this.userall.push(this.user)
                this.cls = true
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

            if(this.messall.length > 10)
                this.messall.shift()
            }
        },
    })
app.mount('#main')