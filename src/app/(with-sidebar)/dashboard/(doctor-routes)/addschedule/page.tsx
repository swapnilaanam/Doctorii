"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { BiMessageSquareAdd } from "react-icons/bi";
import axios from "axios";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

type Inputs = {
    scheduleTime: string,
    day1: string,
    day2: string,
    day3: string,
    day4: string,
    day5: string,
    day6: string,
    day7: string
    price: number
}

type NewScheduleType = {
    scheduleTime: string,
    weekDays: any[],
    price: number
};



const AddSchedule = () => {
    let [isOpen, setIsOpen] = useState(false);

    const session = useSession();
    const email = session?.data?.user?.email;

    const { data: timeSlots = [], refetch } = useQuery({
        queryKey: ["timeSlots", email],
        queryFn: async () => {
            const response = await axios.get(`/api/users/email/${email}/timeslots`);
            return response.data;
        }
    });

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        let weekDays = [];

        if (data.day1) {
            weekDays.push(data.day1);
        }
        if (data.day2) {
            weekDays.push(data.day2);
        }
        if (data.day3) {
            weekDays.push(data.day3);
        }
        if (data.day4) {
            weekDays.push(data.day4);
        }
        if (data.day5) {
            weekDays.push(data.day5);
        }
        if (data.day6) {
            weekDays.push(data.day6);
        }
        if (data.day7) {
            weekDays.push(data.day7)
        }

        const newSchedule: NewScheduleType = {
            scheduleTime: data.scheduleTime,
            weekDays: weekDays,
            price: data.price
        };

        reset();
        weekDays = [];

        try {
            const response = await axios.patch(`/api/users/email/${email}/timeslots`, newSchedule);
            if (response?.status === 200) {
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'A new schedule has been added...',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            if (response?.status === 409) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'This schedule already exists...',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }

    const handleDeleteSchedule = async (scheduleTime: string) => {
        // console.log(scheduleTime);
        try {
            const response = await axios.delete(`/api/users/email/${email}/timeslots`, { data: { scheduleTime: scheduleTime } });
            if (response?.status === 200) {
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Schedule has been removed...',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <div className="py-20 w-full min-h-screen bg-gray-100">
            <div className="flex justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="bg-sky-500 px-4 py-2 text-white text-lg font-medium rounded-sm flex justify-center items-center gap-3">
                    <span>Add A Schedule </span>
                    <BiMessageSquareAdd />
                </button>
            </div>
            <div className="flex justify-center items-center text-center">
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-xl font-semibold leading-6 text-gray-900 mb-4"
                                        >
                                            Add A Schedule
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="mb-5">
                                                    <label htmlFor="scheduleTime" className="block text-base font-medium text-gray-900">
                                                        Time Slots:
                                                    </label>

                                                    <select
                                                        {...register("scheduleTime", { required: true })}
                                                        id="scheduleTime"
                                                        className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-2 border-2"
                                                    >
                                                        <option value="">Please select</option>
                                                        <option value="4.00 PM - 4.30 PM">4.00 PM - 4.30 PM</option>
                                                        <option value="4.30 PM - 5.00 PM">4.30 PM - 5.00 PM</option>
                                                        <option value="5.00 PM - 5.30 PM">5.00 PM - 5.30 PM</option>
                                                        <option value="6.30 PM - 7.00 PM">6.30 PM - 7.00 PM</option>
                                                        <option value="7.00 PM - 7.30 PM">7.00 PM - 7.30 PM</option>
                                                        <option value="7.30 PM - 8.00 PM">7.30 PM - 8.00 PM</option>
                                                        <option value="8.00 PM - 8.30 PM">8.00 PM - 8.30 PM</option>
                                                        <option value="8.30 PM - 9.00 PM">8.30 PM - 9.00 PM</option>
                                                        <option value="9.00 PM - 9.30 PM">9.00 PM - 9.30 PM</option>
                                                        <option value="9.30 PM - 10.00 PM">9.30 PM - 10.00 PM</option>
                                                        <option value="10.00 PM - 10.30 PM">10.00 PM - 10.30 PM</option>
                                                    </select>
                                                    {errors.scheduleTime && <p className="mt-2 text-red-600">Time Slot Is Required...</p>}
                                                </div>
                                                <div>
                                                    <h4 className="text-base font-medium mb-2">Weekdays:</h4>

                                                    <div className="flex items-center gap-3 mb-1">
                                                        <input type="checkbox" id="day1" {...register("day1")} value="Saturday" defaultChecked />
                                                        <label htmlFor="day1">Saturday</label>
                                                    </div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <input type="checkbox" id="day2" {...register("day2")} value="Sunday" />
                                                        <label htmlFor="day2">Sunday</label>
                                                    </div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <input type="checkbox" id="day3" {...register("day3")} value="Monday" />
                                                        <label htmlFor="day3">Monday</label>
                                                    </div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <input type="checkbox" id="day4" {...register("day4")} value="Tuesday" />
                                                        <label htmlFor="day4">Tuesday</label>
                                                    </div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <input type="checkbox" id="day5" {...register("day5")} value="Wednesday" />
                                                        <label htmlFor="day5">Wednesday</label>
                                                    </div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <input type="checkbox" id="day6" {...register("day6")} value="Thursday" />
                                                        <label htmlFor="day6">Thursday</label>
                                                    </div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <input type="checkbox" id="day7" {...register("day7")} value="Friday" />
                                                        <label htmlFor="day7">Friday</label>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <label htmlFor="price" className="block text-base font-medium text-gray-900">
                                                        Price:
                                                    </label>
                                                    <input
                                                        {...register("price", { required: true })}
                                                        type="number"
                                                        id="price"
                                                        className="mt-1.5 ps-2 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-2 border-2"
                                                    />
                                                    {errors.price && <p className="mt-2 text-red-600">Price Field Is Required...</p>}
                                                </div>
                                                <input type="submit" className="w-full cursor-pointer mt-6 bg-green-600 text-white px-6 py-1 rounded-md" />
                                            </form>
                                        </div>

                                        <div className="mt-4 flex justify-end">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-yellow-400 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
            <h2 className="text-2xl font-semibold text-center mt-14">Your Added Schedules</h2>
            <div className="max-w-7xl mx-auto mt-12 flex flex-wrap justify-center items-center gap-12">
                {
                    timeSlots?.length === 0 ? (
                        <h4 className="text-center text-xl font-medium tracking-wider">No Schedule Is Added Yet...</h4>
                    ) : (
                        timeSlots?.map((timeSlot: NewScheduleType, index: number) => {
                            return (
                                <div key={index} className="w-96 h-64 group relative block bg-white cursor-pointer shadow-xl">
                                    <div className="relative p-4 sm:p-6 lg:p-8">
                                        <div className="flex justify-between">
                                            <p className="text-base font-semibold uppercase tracking-widest text-sky-600">
                                                Slot
                                            </p>
                                            <button onClick={() => handleDeleteSchedule(timeSlot.scheduleTime)} className="bg-red-600 text-white px-4 py-1 text-lg rounded-sm">Delete</button>
                                        </div>

                                        <p className="text-xl font-bold text-black sm:text-2xl">{timeSlot.scheduleTime}</p>
                                        <p className="text-xl font-medium text-sky-600 sm:text-base mt-3 tracking-wider">Price: <strong className="ms-1">$ {timeSlot.price}</strong></p>

                                        <div className="mt-2 sm:mt-4 lg:mt-12">
                                            <div
                                                className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                                            >
                                                <div className="flex flex-wrap justify-center items-end gap-4">
                                                    {
                                                        timeSlot.weekDays.map((weekDay: any[], index: number) => {
                                                            return (
                                                                <p key={index} className="text-base font-medium text-black">
                                                                    {weekDay}
                                                                </p>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>
        </div>
    );
};

export default AddSchedule;