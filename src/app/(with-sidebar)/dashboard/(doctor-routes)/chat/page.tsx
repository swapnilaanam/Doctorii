'use client';

import { IoIosSend } from "react-icons/io";
import { ChatContext } from '@/providers/ChatProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";

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

        const msg = `${session?.data?.user?.image}: ${session?.data?.user?.name}: ${message}`;

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
        <section className="py-14 mx-4 md:mx-20">
            {
                !roomName && (
                    <>
                        <h2 className="text-center text-2xl font-medium mb-12">Available Rooms: </h2>
                        <div className="flex justify-center items-center gap-14 flex-wrap">
                            {
                                rooms?.map((room) => {
                                    return (
                                        <div key={room?._id} className="bg-gray-200 p-5 md:p-10 w-96 text-center">
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
                        <div className="border-green-700 md:h-[500px]">
                            <div className="bg-sky-600 py-4 px-10 flex justify-between items-center rounded">
                                <div className="w-full flex flex-col md:flex-row justify-center items-center gap-5">
                                    <FaArrowLeft onClick={() => setRoomName('')} className="text-white font-medium hover:cursor-pointer" />
                                    <h4 className="text-white text-xl font-semibold">
                                        {decodeURIComponent(doctorName)}
                                    </h4>
                                </div>
                            </div>
                            <div className="px-4 md:px-10 py-7 space-y-5">
                                {
                                    allMessages && (
                                        allMessages?.slice(allMessages?.length - 5, allMessages?.length)?.map((message, index) => {
                                            const proPic = message?.split(': ')[0];
                                            const msg = message?.split(': ')[2];

                                            if (message?.includes(session?.data?.user?.name)) {
                                                return (
                                                    <div key={index} className='text-right flex justify-end items-center gap-5'>
                                                        <p className="bg-sky-200 px-4 md:px-7 py-3 rounded-xl text-right">
                                                            {msg}
                                                        </p>
                                                        <div className="relative min-w-14 h-14">
                                                            <Image fill={true} src={proPic} alt="proPic" className="w-full h-full object-cover rounded-full  border-2 border-gray-300" />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            else {
                                                return (
                                                    <div key={index} className='text-right flex items-center justify-start gap-5'>
                                                        <div className="relative min-w-14 h-14">
                                                            <Image fill={true} src={proPic} alt="proPic" className="w-full h-full object-cover rounded-full border-2 border-gray-300" />
                                                        </div>
                                                        <p className="bg-sky-200 px-4 md:px-7 py-3 rounded-xl text-right">
                                                            {msg}
                                                        </p>
                                                    </div>
                                                )
                                            }
                                        })
                                    )
                                }
                            </div>
                        </div>
                        <form onSubmit={(e) => handleSendMessage(e)} className='flex flex-col lg:flex-row justify-between items-center'>
                            <div className="w-full lg:w-[70%] h-[140px]">
                                <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} className="border-2 border-sky-400 px-5 py-3 w-full h-full rounded-sm" placeholder="Send your messages..." />
                            </div>
                            <div className="w-full md:w-[28%] h-[120px] flex justify-center items-center">
                                <button className="bg-sky-600 flex justify-center items-center px-7 rounded cursor-pointer">
                                    <input type="submit" value="Send Message" className="text-white text-lg py-5 px-7 w-full" />
                                    <IoIosSend className="text-white text-xl" />
                                </button>
                            </div>
                        </form>
                    </>
                )
            }
        </section>
    )
};

export default Chat;