import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
    const history = useNavigate();
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const [newMessage, setNewMessage] = useState([]);
    const [notification, setNotification] = useState([]);


    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        if (!userInfo) {
            history("/");
        }
    }, [history])


    return (
        <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats, setNewMessage, newMessage, notification, setNotification }}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;