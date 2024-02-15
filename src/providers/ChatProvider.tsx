'use client';

import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

export const ChatContext = createContext(null);

const ChatProvider = ({ children }: { children: any }) => {
    const socket = useMemo(() => io('http://localhost:4000'), []);

    const [socketId, setSocketId] = useState([]);
    const [allMessages, setAllMessages] = useState([]);

    useEffect(() => {
        socket.on('connect', () => {
            setSocketId(socket.id);
            console.log('User is connected', socket.id);
        });

        socket.on('receive-message', async ({ roomName, msg }) => {
            try {
                await axios.patch(`/api/chatrooms/roomname/${roomName}`, { message: msg });
                setAllMessages((allMessages) => [...allMessages, msg]);
            } catch (error: any) {
                console.log(error?.message);
            }
        });

        return () => {
            socket.disconnect();
        }
    }, [socket]);

    const chatInfo = {
        socket, 
        allMessages,
        setAllMessages
    };

    return (
        <ChatContext.Provider value={chatInfo}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;