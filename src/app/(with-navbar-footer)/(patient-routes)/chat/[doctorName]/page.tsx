'use client';

import { ChatContext } from '@/providers/ChatProvider';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import Swal from 'sweetalert2';

const ChatWithDoctor = () => {
    const { doctorName } = useParams();

    const session = useSession();
    const router = useRouter();

    const { socket, allMessages, setAllMessages } = useContext(ChatContext);

    const [message, setMessage] = useState('');
    const [roomName, setRoomName] = useState('');

    useEffect(() => {
        const email = session?.data?.user?.email;

        if (email) {
            axios.get(`/api/memberships/${email}`)
                .then((res) => {
                    if (res?.status === 200) {
                        if (!(res?.data)) {
                            Swal.fire('Emergency Chat Is Only Available For The Membership Patients!');
                            return router.push('/');
                        }
                        else {
                            axios.get('/api/chatrooms')
                                .then(response => {
                                    const rooms = response?.data;

                                    if (session?.data?.user) {
                                        const decodedDoctorName = decodeURIComponent(doctorName);

                                        setRoomName(`${session?.data?.user?.name} ${decodedDoctorName}`);
                                        socket.emit('join-room', roomName);

                                        if (roomName) {
                                            if (!rooms && rooms?.length === 0) {
                                                axios.post('/api/chatrooms', { doctorName: decodedDoctorName, roomName: roomName, allMessages: [] });
                                            }
                                            else {
                                                const isRoomExist = rooms?.find((room) => room?.roomName === roomName);

                                                if (!isRoomExist) {
                                                    axios.post('/api/chatrooms', { doctorName: decodedDoctorName, roomName: roomName, allMessages: [] });
                                                }
                                            }
                                        }
                                    }
                                }
                                )
                                .catch(error => console.log(error?.message));
                        }
                    }
                })
                .catch((err) => console.log(err?.message));
        }
    }, [doctorName, session, socket, roomName, router]);

    useEffect(() => {
        if (roomName) {
            axios.get(`/api/chatrooms/roomname/${roomName}`)
                .then((response) => {
                    setAllMessages(response?.data);
                });
        }
    }, [roomName, setAllMessages]);

    const handleSendMessage = (e: Event) => {
        e.preventDefault();

        if (!message) {
            return;
        }

        const msg = `${session?.data?.user?.image}: ${session?.data?.user?.name}: ${message}`;

        socket.emit("send-message", { roomName, msg });
        setMessage('');
    };

    const handleLeaveChat = async (roomName: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Your All Messages Will Be Deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Leave The Chat!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`/api/chatrooms/roomname/${roomName}`);

                    if (response?.status === 200) {
                        Swal.fire({
                            title: "Left!",
                            text: "You left the chat successfully!.",
                            icon: "success"
                        });
                        return router.push('/');
                    }
                } catch (error: any) {
                    console.log(error?.message);
                }
            }
        });
    }

    return (
        <section className="py-14 mx-14">
            {
                roomName && (
                    <>
                        <div className="border-green-700 h-[460px]">
                            <div className="bg-sky-600 py-4 px-10 flex justify-between items-center rounded">
                                <div className="flex justify-center items-center gap-5">
                                    <FaArrowLeft onClick={() => router.push('/')} className="text-white font-medium hover:cursor-pointer" />
                                    <h4 className="text-white text-xl font-semibold">
                                        {decodeURIComponent(doctorName)}
                                    </h4>
                                </div>
                                <button onClick={() => handleLeaveChat(roomName)} className="bg-red-700 text-white font-medium px-10 py-2 rounded">
                                    Leave
                                </button>
                            </div>
                            <div className="px-10 py-7 space-y-5">
                                {
                                    allMessages && (
                                        allMessages?.slice(allMessages?.length - 5, allMessages?.length)?.map((message, index) => {
                                            const proPic = message?.split(': ')[0];
                                            const msg = message?.split(': ')[2];

                                            if (message?.includes(session?.data?.user?.name)) {
                                                return (
                                                    <div key={index} className='text-right flex justify-end items-center gap-5'>
                                                        <p className="bg-sky-200 px-7 py-3 rounded-xl text-right">
                                                            {msg}
                                                        </p>
                                                        <div className="relative w-14 h-14">
                                                            <Image fill={true} src={proPic} alt="proPic" className="w-full h-full object-cover rounded-full border-2 border-gray-300" />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            else {
                                                return (
                                                    <div key={index} className='text-right flex items-center justify-start gap-5'>
                                                        <div className="relative w-14 h-14">
                                                            <Image fill={true} src={proPic} alt="proPic" className="w-full h-full object-cover rounded-full border-2 border-gray-300" />
                                                        </div>
                                                        <p className="bg-sky-200 px-7 py-3 rounded-xl text-right">
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
                        <form onSubmit={(e) => handleSendMessage(e)} className='flex justify-between items-center'>
                            <div className="w-[70%] h-[100px]">
                                <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} className="border-2 border-sky-400 px-5 py-3 w-full h-full rounded-sm" placeholder="Send Messages..." />
                            </div>
                            <div className="w-[28%] h-[120px] flex justify-center items-center">
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
}

export default ChatWithDoctor;