"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useCallback, useMemo, useState } from "react";

import './page.css';
import AppointmentPopUp from "@/components/AppointmentPopUp/AppointmentPopUp";

const PatientAppointment = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState({});

    const [view, setView] = useState(Views.WEEK);
    const [date, setDate] = useState(new Date());

    const session = useSession();

    const email = session?.data?.user?.email;

    const { data: appointments = [], refetch } = useQuery({
        queryKey: ["appointments", email],
        queryFn: async () => {
            try {
                if (email) {
                    const response = await axios.get(`/api/appointments/email/${email}?user=${'patient'}`);
                    return response?.data;
                }
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

    const events = appointments?.map((appointment => {

        // console.log(appointment?.scheduleTime);

        const scheduleTime = appointment?.scheduleTime.split(' ');

        const startTime = scheduleTime[0];
        const endTime = scheduleTime[3];

        // console.log(scheduleTime);

        let startHour = startTime.split('0')[0];

        if(scheduleTime[1] === 'PM') {
            startHour = String(12 + Number(startHour));
        }

        const startMinutes = startTime.split('.')[1];

        let endHour = endTime.split('.')[0];

        if(scheduleTime[4] === 'PM') {
            endHour = String(12 + Number(endHour));
        }

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
        <div className="py-20 px-4 bg-gray-100 min-h-screen">
            <h1 className="text-center text-3xl font-semibold mb-20">Appointments</h1>
            <div className="max-w-7xl mx-auto max-h-[450px] overflow-auto">
                <Calendar
                    localizer={localizer}
                    defaultView={Views.WEEK}
                    startAccessor="start"
                    endAccessor="end"
                    views={views}
                    events={events}
                    view={view}
                    onView={(view) => setView(view)}
                    date={date}
                    onSelectEvent={handleSelectEvent}
                    onNavigate={(date) => setDate(date)}
                    popup
                />
            </div>
            {isModalOpen && <AppointmentPopUp appointmentInfo={modalInfo} setIsModalOpen={setIsModalOpen} user={`patient`} refetch={refetch} />}
        </div>
    );
};

export default PatientAppointment;