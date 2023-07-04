import React, { useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react';
import MyChats from '../miscellaneous/MyChats';
import ChatBox from '../miscellaneous/ChatBox';
import SideDrawer from '../miscellaneous/SideDrawer';

const Chat = () => {
    const { user } = ChatState();
    const [fetchAgain, setFetchAgain]=useState(false);

    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box display="flex" justifyContent='space-between' width='100%' height='91.5vh' padding='10'>
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
            </Box>
        </div>
    )
}

export default Chat
