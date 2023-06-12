import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
const Chat = () => {
    const [chats,setChats]=useState([]);
    const fetchchats = async () => {
        const { data } = await axios.get('/api/chat');
        setChats(data);
    }
    useEffect(() => {
        fetchchats();
    }, [])
    return (
        <div>
            {chats.map((chat)=>
            <div key={chat._id}>{chat.chatName}</div>)}
        </div>
    )
}

export default Chat
