"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const Booking = () => {

    const { id } = useParams();

    const session = useSession();

    const router = useRouter();

    var weekDaysName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    const day = weekDaysName[date.getDay()];

    const { data: doctor = {} } = useQuery({
        queryKey: ["doctor", id],
        queryFn: async () => {
            try {
                const response = await axios.get(`/api/users/id/${id}`);
                return response.data;
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });

    const { data: timeSlots = [], refetch } = useQuery({
        queryKey: ["timeSlots", doctor?.email],
        queryFn: async () => {
            if (doctor.email) {
                const response = await axios.get(`/api/users/email/${doctor?.email}/timeslots`);
                const schedules = response?.data?.filter((schedule) => schedule?.weekDays.includes(day))
                // console.log(schedules);
                return schedules;
            }
        }
    });


    const handleScheduleChange = (e) => {
        const scheduleTime = e.target.value;

        const timeSlot = timeSlots.find((timeSlot => timeSlot.scheduleTime === scheduleTime))

        const price = timeSlot.price;
        const tax = (price * 2) / 100;
        const total = Number(price) + Number(tax);

        const priceElement = document.getElementById("price");
        const taxElement = document.getElementById("tax");
        const totalElement = document.getElementById("total");

        priceElement.innerText = price;
        taxElement.innerText = tax;
        totalElement.innerText = total;
    }

    const handleCheckOut = async () => {
        const dd = date.getDate();
        const mm = date.getMonth() + 1;
        const yyyy = date.getFullYear();

        const scheduleDate = `${dd}-${mm}-${yyyy}`;

        const appointment = {
            patientName: session?.data?.user?.name,
            patientEmail: session?.data?.user?.email,
            doctorName: doctor?.name,
            doctorEmail: doctor?.email,
            scheduleDate: scheduleDate,
            scheduleTime: document.getElementById("schedule")?.value,
            ticketPrice: document.getElementById("total")?.innerText
        }

        try {
            localStorage.setItem("newAppointment", JSON.stringify(appointment));
            router.push('/payment')
        } catch (error: any) {
            console.log(error?.message);
        }

    }

    return (
        <div>
            <section className="w-full min-h-screen">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                        <header className="text-center">
                            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl mb-20">Book Appointment</h1>
                        </header>

                        <div className="mt-8">
                            <ul className="space-y-4">
                                <div className="flex flex-col justify-center items-center gap-7">
                                    <div className="flex justify-center items-center gap-4">
                                        <Image src={doctor?.profilePic} alt="profile" width={60} height={60} className="rounded-sm" />

                                        <div>
                                            <h3 className="text-lg text-gray-900">{doctor.name}</h3>

                                            <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                                <div>
                                                    <dt className="inline text-base">Type: <strong>{doctor.doctorRole}</strong></dt>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-medium">
                                            Selected Date: <span className="ml-3 text-base text-gray-600">{date.toDateString()}</span>
                                        </h4>
                                    </div>
                                    <div className="flex flex-1 items-center justify-end gap-4">
                                        <label htmlFor="schedule" className="text-lg font-medium">Select Schedule:</label>
                                        <select className="border-2 px-2 py-1" id="schedule" name="schedule" onChange={handleScheduleChange}>
                                            <option disabled>Select Your Schedule</option>
                                            {
                                                timeSlots.map((timeSlot, index) => {
                                                    return (
                                                        <option key={index} value={timeSlot.scheduleTime}>{timeSlot.scheduleTime}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </ul>


                            <div className="mt-8 flex justify-center border-t border-gray-100 pt-8">
                                <div className="w-screen max-w-lg space-y-4">
                                    <dl className="space-y-0.5 text-base text-gray-700">
                                        <div className="flex justify-between">
                                            <dt>Price:</dt>
                                            <dd>$ <span id="price">{timeSlots[0]?.price}</span></dd>
                                        </div>

                                        <div className="flex justify-between">
                                            <dt>TAX(2%):</dt>
                                            <dd>$ <span id="tax">{(timeSlots[0]?.price * 2) / 100}</span></dd>
                                        </div>

                                        <div className="flex justify-between !text-base font-medium">
                                            <dt>Total:</dt>
                                            <dd>$ <span id="total">{Number(timeSlots[0]?.price) + Number(((timeSlots[0]?.price * 2) / 100))}</span></dd>
                                        </div>
                                    </dl>

                                    <div className="flex justify-center pt-6">
                                        <button
                                            onClick={handleCheckOut}
                                            className="block rounded bg-sky-500 px-28 py-2 text-lg font-medium text-white transition hover:bg-sky-600"
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Booking;