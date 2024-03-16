'use client';

import useIsPatient from '@/hooks/useIsPatient';
import { ChatContext } from '@/providers/ChatProvider';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { IoIosSend } from 'react-icons/io';

const ChatWithDoctor = () => {
    const { doctorName } = useParams();

    const session = useSession();

    const { socket, allMessages, setAllMessages } = useContext(ChatContext);

    const [message, setMessage] = useState('');
    const [roomName, setRoomName] = useState('');
    const [docName, setDocName] = useState('');
    const [patientName, setPatientName] = useState('');

    useEffect(() => {
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
    }, [doctorName, session, socket, roomName]);

    useEffect(() => {
        if (roomName) {
            axios.get(`/api/chatrooms/roomname/${roomName}`)
                .then((response) => setAllMessages(response?.data));
        }
    }, [roomName, setAllMessages]);

    const handleSendMessage = (e: Event) => {
        e.preventDefault();

        const msg = `${session?.data?.user?.name}: ${message}`;

        socket.emit("send-message", { roomName, msg });
        setMessage('');
    };

    return (
        <section className="py-20 mx-14">
            {
                roomName && (
                    <>
                        <div className="border-green-700 h-[500px]">
                            <div className="bg-sky-500 py-4 px-4 flex justify-between items-center">
                                <h4 className="text-white text-xl font-semibold">{session?.data?.user?.name}, {decodeURIComponent(doctorName)}</h4>
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
}

export default ChatWithDoctor;