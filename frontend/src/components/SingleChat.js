import React, { useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModal from '../miscellaneous/ProfileModal';
import UpdateGroupChatModal from '../miscellaneous/UpdateGroupChatModal';
import axios from 'axios';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const { user, selectedChat, setSelectedChat,newMessage, setNewMessage } = ChatState();
    const toast= useToast();

    const sendMessage=async(e)=>{
        if(e.key === "Enter" && newMessage){
            try {
                const config = {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${user.token}`
                    },
                  }
                  setNewMessage("")
                  const {data} = await axios.post('/api/message',{
                    content: newMessage,
                    chatId: selectedChat._id
                  },config)
                  setMessages([...messages,data])
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    status: "error",
                    description:"Failed to send the message",
                    duration: 2000,
                    isClosable: true,
                    position: "bottom-left"
                  })
            }
        }
    }

    const typingHanlder=(e)=>{ 
        setNewMessage(e.target.value);
    }
    return (
        <>
            {selectedChat ? <>
                <Text
                    fontSize={{ base: "28px", md: "30px" }}
                    pb={3}
                    px={2}
                    w="100%"
                    fontFamily="sans-serif"
                    display="flex"
                    justifyContent={{ base: "space-between" }}
                    alignItems="center"
                >
                    <IconButton
                        display={{ base: "flex", md: "none" }}
                        icon={<ArrowBackIcon />}
                        onClick={() => setSelectedChat("")}
                    />
                    {!selectedChat.isGroupChat ?
                        <>
                            {getSender(user, selectedChat.users)}
                            <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                        </> : (
                            <>
                                {selectedChat.chatName.toUpperCase()}
                                <UpdateGroupChatModal
                                fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
                            </>
                        )
                    }
                </Text>
                <Box display="flex"
                    flexDir="column"
                    justifyContent="flex-end"
                    p={3}
                    bg="#E8E8E8"
                    w="100%"
                    h="100%"
                    borderRadius="lg"
                    overflowY="hidden">
                    
                    {loading?
                    <Spinner 
                    size={"xl"}
                    w={20}
                    h={20}
                    alignSelf={"center"}
                    margin={"auto"}/>:
                    <div>
                        {}
                    </div>
                    }
                    <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                        <Input variant={"filled"} bg={"#E0E0E0"} placeholder='Enter a message...'
                        onChange={typingHanlder} value={newMessage}/>
                    </FormControl>

                </Box>
            </> :

                <Box display="flex" alignItems="center" justifyContent="center" h="100%">
                    <Text fontSize="3xl" pb={3} fontFamily="sans-serif">
                        Click on a user to start chatting
                    </Text>
                </Box>
            }
        </>
    )
}

export default SingleChat
