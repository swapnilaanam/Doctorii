"use client"

import { Dialog, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import Swal from "sweetalert2";

const DoctorDashboard = () => {
    let [isOpen, setIsOpen] = useState(false);

    const session = useSession();
    const email = session?.data?.user?.email;

    const { data: user = {}, refetch } = useQuery({
        queryKey: ['user', email],
        queryFn: async () => {
            const response = await axios.get(`/api/users/email/${email}`);
            return response.data;
        }
    });

    const { data: appointments = [] } = useQuery({
        queryKey: ['appointments'],
        queryFn: async () => {
            try {
                const response = await axios.get(`/api/appointments/${session?.data?.user?.email}`);
                return response?.data;
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });

    const { data: totalAmount = 0 } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            try {
                const response = await axios.get(`/api/payments/${session?.data?.user?.email}`);
                return response?.data?.reduce((total, current) => total + current?.ticketPrice, 0);
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleChangeDoctorRole = async (e) => {
        e.preventDefault();

        const doctorRole = e.target.doctorRole.value;
        const chamberLocation = e.target.chamberLocation.value;

        try {
            const response = await axios.patch(`/api/users/email/${session?.data?.user?.email}/doctors`, { doctorRole, chamberLocation });

            if (response?.status === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Doctor Info Is Updated Now!",
                    showConfirmButton: false,
                    timer: 1000
                });
                refetch();
                setIsOpen(false);
            }
        } catch (error: any) {
            console.log(error?.message)
        }
    };

    return (
        <div className="py-20 px-4 bg-gray-100 w-full min-h-screen">
            <h2 className="text-3xl md:text-4xl font-semibold text-center pb-20">Doctor Dashboard</h2>
            <div className="flex flex-wrap justify-center items-center gap-20 pb-12">
                <div className="bg-sky-600 text-white w-[400px] h-40 text-3xl font-semibold flex justify-center items-center rounded hover:bg-sky-700 hover:cursor-pointer">
                    <span>
                        {
                            appointments?.length
                        }
                    </span>
                    <span className="ms-4">
                        Appointments
                    </span>
                </div>
                <div className="bg-green-600 text-white w-[400px] h-40 text-3xl font-semibold flex justify-center items-center rounded hover:bg-green-700 hover:cursor-pointer">
                    <span>
                        $
                    </span>
                    <span className="ms-4">
                        {
                            totalAmount
                        }
                    </span>
                </div>
            </div>
            <div className="max-w-5xl mx-auto mt-14">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 mb-10">
                    <h4 className="text-2xl font-medium text-center">Account Details</h4>
                    {
                        user?.doctorRole !== 'Emergency' && (
                            <button onClick={() => setIsOpen(true)} className="bg-sky-500 text-white text-lg px-6 py-2 rounded-sm">
                                Edit Profile
                            </button>
                        )
                    }
                </div>
                <div className="space-y-7">
                    <div className="flex justify-center md:justify-normal gap-2 md:gap-5 text-xl md:text-2xl md:ml-20">
                        <h4>Name: </h4>
                        <h4><strong>{user.name}</strong></h4>
                    </div>
                    <div className="flex justify-center md:justify-normal gap-2 md:gap-5 text-xl md:text-2xl md:ml-20">
                        <h4>Email: </h4>
                        <h4><strong>{user.email}</strong></h4>
                    </div>
                    <div className="flex justify-center md:justify-normal gap-2 md:gap-9 text-xl md:text-2xl md:ml-20">
                        <h4>Role: </h4>
                        <h4><strong>{user.role}</strong></h4>
                    </div>
                    <div className="flex justify-center md:justify-normal gap-2 md:gap-5 text-xl md:text-2xl md:ml-20">
                        <h4>Doctor Role: </h4>
                        <h4><strong>{user?.doctorRole}</strong></h4>
                    </div>
                    {
                        user?.doctorRole !== 'Emergency' && (
                            <div className="flex justify-center md:justify-normal gap-2 md:gap-5 text-xl md:text-2xl md:ml-20">
                                <h4>Chamber Location: </h4>
                                <h4><strong>{user?.chamberLocation}</strong></h4>
                            </div>
                        )
                    }
                </div>
                {
                    (!user?.chamberLocation && user?.doctorRole !== 'Emergency') && (
                        <h6 className="mt-20 text-center text-red-600 text-xl font-medium">
                            !!! Account Not Visible! Add Chamber Location To Activate Your Account !!!
                        </h6>
                    )
                }
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
                                            Change Doctor Role
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <form onSubmit={handleChangeDoctorRole}>
                                                <div className="mb-5">
                                                    <label htmlFor="doctorRole" className="block text-base font-medium text-gray-900">
                                                        Doctor Role:
                                                    </label>

                                                    <select
                                                        name="doctorRole"
                                                        id="doctorRole"
                                                        defaultValue="Regular Doctor"
                                                        className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-2 border-2"
                                                    >
                                                        <option value="Regular Doctor">
                                                            Regular Doctor
                                                        </option>
                                                        <option value="Child And Gynecology Doctor">
                                                            Child And Gynecology Doctor
                                                        </option>
                                                        <option value="Heart Specialist Doctor">
                                                            Heart Specialist Doctor
                                                        </option>
                                                        <option value="Bone Specialist Doctor">
                                                            Bone Specialist Doctor
                                                        </option>
                                                        <option value="Eye Specialist Doctor">
                                                            Eye Specialist Doctor
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="chamberLocation" className="block text-base font-medium text-gray-900">
                                                        Chamber Location:
                                                    </label>

                                                    <input
                                                        type="text"
                                                        name="chamberLocation"
                                                        id="chamberLocation"
                                                        defaultValue={user?.chamberLocation}
                                                        className="mt-1.5 ps-2 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-2 border-2"
                                                    />
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
        </div>
    );
};

export default DoctorDashboard;