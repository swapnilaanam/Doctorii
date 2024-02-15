'use client';

import { IoIosSend } from "react-icons/io";
import { ChatContext } from '@/providers/ChatProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';

const Chat = () => {
    const session = useSession();

    const { socket, allMessages, setAllMessages } = useContext(ChatContext);

    const [roomName, setRoomName] = useState('');
    const [message, setMessage] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [patientName, setPatientName] = useState('');

    useEffect(() => {
        if (roomName) {
            axios.get(`/api/chatrooms/roomname/${roomName}`)
                .then((response) => setAllMessages(response?.data));
        }
    }, [roomName, setAllMessages]);

    const { data: rooms = [] } = useQuery({
        queryKey: ['rooms', session?.data?.user?.name],
        queryFn: async () => {
            try {
                if (session?.data?.user) {
                    const response = await axios.get(`/api/chatrooms/doctorname/${session?.data?.user?.name}`);
                    return response?.data;
                }
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });

    const handleSendMessage = (e: Event) => {
        e.preventDefault();

        const msg = `${session?.data?.user?.name}: ${message}`;

        socket.emit('send-message', { roomName: roomName, msg: msg });
        setMessage('');
    };

    const handleJoinRoom = (room: any) => {
        socket.emit('join-room', room?.roomName);
        setRoomName(room?.roomName);

        const str = room?.roomName;
        const subStr = room?.doctorName;

        const parts = str.split(subStr);

        setDoctorName(room?.doctorName);
        setPatientName(parts[0]);
    }

    return (
        <section className="py-20 mx-20">
            {
                !roomName && (
                    <>
                        <h2 className="text-center text-2xl font-medium mb-12">Available Rooms: </h2>
                        <div className="flex justify-center items-center">
                            {
                                rooms?.map((room) => {
                                    return (
                                        <div key={room?._id} className="bg-gray-200 p-10 w-96 text-center">
                                            <h4 className="text-xl font-medium">Room Name:</h4>
                                            <p className="text-lg font-normal ms-7 mt-3">{room?.roomName}</p>
                                            <button className="bg-green-600 text-white px-4 py-2 mt-6 text-sm font-medium" onClick={() => handleJoinRoom(room)}>
                                                Join The Room
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                )
            }
            {
                roomName && (
                    <>
                        <div className="border-green-700 h-[500px]">
                            <div className="bg-sky-500 py-4 px-4 flex justify-between items-center">
                                <h4 className="text-white text-xl font-semibold">{patientName}, {doctorName}</h4>
                                <button className="bg-red-700 text-white font-medium px-10 py-2 rounded">
                                    Leave
                                </button>
                            </div>
                            {
                                allMessages && (
                                    allMessages?.map((message, index) => <p key={index}>{message}</p>)
                                )
                            }
                        </div>
                        <form onSubmit={(e) => handleSendMessage(e)} className='flex justify-between items-center'>
                            <div className="w-[70%] h-[140px]">
                                <textarea type="text" id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} className="border-2 border-sky-400 px-5 py-3 w-full h-full rounded-sm" />
                            </div>
                            <div className="w-[28%] h-[120px] flex justify-center items-center">
                                <div className="bg-sky-600 flex justify-center items-center px-7">
                                    <input type="submit" value="Send Message" className="text-white py-3 w-full" />
                                    <IoIosSend className="text-white text-2xl ml-2" />
                                </div>
                            </div>
                        </form>
                    </>
                )
            }
        </section>
    )
};

export default Chat;