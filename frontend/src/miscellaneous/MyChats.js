import React from 'react'
import { ChatState } from '../Context/ChatProvider'

const MyChats = () => {
  const { user, setUser, setSelectedChat, chats, setChats } = ChatState();
  return (
    <div>

    </div>
  )
}

export default MyChats
