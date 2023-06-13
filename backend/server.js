const express = require("express");
const chats = require("./data/data");
const app = express();
const dotenv=require('dotenv');
const ConnectToDB = require("./config/db");
dotenv.config();
const port = process.env.port || 5000;
ConnectToDB();

app.get('/api/chat', (req, res) => {
    res.send(chats);
})

app.get("/api/chat/:id", (req, res) => {
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
})
app.listen(port, () => {
    console.log(`Bolnuhos backend running on : http://localhost:${port}`)
})