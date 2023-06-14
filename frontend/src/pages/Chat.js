import React, { } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react';
import MyChats from '../miscellaneous/MyChats';
import ChatBox from '../miscellaneous/ChatBox';
import SideDrawer from '../miscellaneous/SideDrawer';

const Chat = () => {
    const { user } = ChatState();


    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box d="flex" justifyContent='space-between' w='100%' h='91.5vh' p='10'>
                {user && <MyChats />}
                {user && <ChatBox />}
            </Box>
        </div>
    )
}

export default Chat
