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

app.listen(port, () => {
    console.log(`Bolnuhos backend running on http://localhost:${port}`)
})