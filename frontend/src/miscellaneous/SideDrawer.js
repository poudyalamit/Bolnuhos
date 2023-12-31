import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import { getSender } from '../config/ChatLogics';
import {  Badge } from 'antd';

const SideDrawer = () => {
    const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();
    const history = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history("/");
    }
    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter something to search",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top-left"
            })
        }
        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
            }

            const { data } = await axios.get(`/api/user/getall?search=${search}`, config);

            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "bottom-left"
            })
        }
    }
    const accessChat = async (userId) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                },
            }

            const { data } = await axios.post(`/api/chat`, { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats])

            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: "Error Occured!",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "bottom-left"
            })
        }
    }

    return (
        <>
            <Box display={"flex"} justifyContent="space-between" alignItems="center" bg="white" w="100%" p="5px 10px 5px 10px" borderWidth="5px">
                <Tooltip label='Search Users to chat' hasArrow placement='bottom-end'>
                    <Button variant='ghost' onClick={onOpen}>
                        <FaSearch />
                        <Text display={{ base: "none", md: "flex" }} px="4">Search User</Text>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="sans-serif" style={{ "color": "#1a1a8d" }} >Bolnuhos</Text>
                <div>
                    <Menu>
                        <MenuButton p={2}> 
                        <Badge  count={notification.length} size='small'>
                        <BellIcon fontSize={"2xl"} m={1} /></Badge></MenuButton>
                        <MenuList pl={2}>
                            {!notification.length && "No New Messages"}
                            {notification.map(noti =>(
                                <MenuItem key={noti._id} onClick={(()=> {
                                    setSelectedChat(noti.chat)
                                    setNotification(notification.filter((n)=> n !== noti))
                                })}>
                                    {noti.chat.isGroupChat ? `New Message in ${noti.chat.chatName}` 
                                    : `New Message from ${getSender(user, noti.chat.users)}`}
                                </MenuItem>
                                ))}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                <Avatar size="sm" cursor={"pointer"} name={user.name} src={user.pic} />
                            </MenuButton>
                            <MenuList>
                                <ProfileModal user={user}>
                                    <MenuItem>My Profile</MenuItem>
                                </ProfileModal>
                                <MenuDivider />
                                <MenuItem onClick={logoutHandler}>Logout</MenuItem></MenuList>
                        </Menu>
                    </Menu>
                </div>
            </Box>

            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>
                    <DrawerBody>
                        <Box display={"flex"} pb={2} >
                            <Input placeholder='Search by name or email'
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)} />
                            <Button onClick={handleSearch}>Go</Button>
                        </Box>
                        {loading ?
                            <ChatLoading />
                            : searchResult?.map(user => (
                                <UserListItem key={user._id} user={user} handleFunction={() => accessChat(user._id)} />
                            ))}
                        {loadingChat && <Spinner ml="auto" display={"flex"} />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

        </>
    )
}

export default SideDrawer
