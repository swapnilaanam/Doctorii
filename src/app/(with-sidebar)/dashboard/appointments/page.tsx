"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useCallback, useMemo, useState } from "react";

import './page.css';
import AppointmentPopUp from "@/components/AppointmentPopUp/AppointmentPopUp";

const Appointments = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState({});

    const session = useSession();

    const email = session?.data?.user?.email;

    const { data: appointments = [], refetch } = useQuery({
        queryKey: ["appointments", [email]],
        queryFn: async () => {
            try {
                const response = await axios.get(`/api/appointments/email/${email}?user=${'doctor'}`);
                return response?.data;
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    })

    const localizer = momentLocalizer(moment);

    const { views } = useMemo(() => ({
        views: {
            week: true,
            day: true,
            agenda: true
        },
    }), []);

    const events = appointments.map((appointment => {

        const scheduleTime = appointment?.scheduleTime.split(' ');

        const startTime = scheduleTime[0];
        const endTime = scheduleTime[3];

        const startHour = startTime.split('.')[0];
        const startMinutes = startTime.split('.')[1];

        const endHour = endTime.split('.')[0];
        const endMinutes = endTime.split('.')[1];

        const formattedDate = appointment?.scheduleDate.split('-');

        const day = formattedDate[0];
        const month = formattedDate[1];
        const year = formattedDate[2];

        // console.log(startTime);
        // console.log(endTime);

        // console.log(formattedDate);
        // console.log(day);
        // console.log(month);
        // console.log(year);

        const startingTime = moment({ year: year, month: month - 1, day: day, hour: startHour, minute: startMinutes }).toDate();
        const endingTime = moment({ year: year, month: month - 1, day: day, hour: endHour, minute: endMinutes }).toDate();


        return {
            id: appointment?._id,
            title: `Patient Name: ${appointment?.patientName}`,
            start: startingTime,
            end: endingTime,
        }
    }))

    const handleSelectEvent = useCallback((event) => {
        setIsModalOpen(true);
        const appointmentInfo = appointments.find(appointment => appointment._id === event.id);
        setModalInfo(appointmentInfo);
    },
        [appointments]
    )

    return (
        <div className="py-20 bg-gray-100 min-h-screen">
            <h1 className="text-center text-3xl font-semibold mb-20">Appointments</h1>
            <div className="max-w-7xl mx-auto max-h-[450px] overflow-auto">
                <Calendar
                    localizer={localizer}
                    defaultView={Views.WEEK}
                    startAccessor="start"
                    endAccessor="end"
                    views={views}
                    events={events}
                    onSelectEvent={handleSelectEvent}
                    popup
                />
            </div>
            {isModalOpen && <AppointmentPopUp appointmentInfo={modalInfo} setIsModalOpen={setIsModalOpen} user={`doctor`} refetch={refetch} />}
        </div>
    );
};

export default Appointments;