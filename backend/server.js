const express = require("express");
const chats = require("./data/data");
const app = express();
const dotenv = require('dotenv');
const ConnectToDB = require("./config/db");
const User = require('./routes/User');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const Chat = require("./routes/Chat");
const Message = require("./routes/Message");
dotenv.config();
const port = process.env.port || 5000;
ConnectToDB();

app.use(express.json());
app.use('/api/user', User)
app.use('/api/chat', Chat)
app.use('/api/message', Message)

//from middleware
app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () => {
    console.log(`Bolnuhos backend running on http://localhost:${port}`)
})

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000"
    }
})

io.on("connection",(socket)=>{
    console.log("Connected to socket.io")

    socket.on('setup', (userData)=>{
        socket.join(userData._id);
        socket.emit("Connected");
        console.log(userData._id);
    })

    socket.on('join chat',(room)=>{
        socket.join(room);
        console.log("User Joined Room:" + room)
    })

    socket.on("new message",(newMessageRecieved)=>{
        var chat = newMessageRecieved.chat;

        if(!chat.users) return console.log('chat.users not defined');

        chat.users.forEach(user =>{
            if(user._id === newMessageRecieved.sender._id) return ;
            
            socket.in(user._id).emit("Message recieved", newMessageRecieved);
        })
    })
})