"use client"

import { Dialog, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { Fragment, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiMessageSquareAdd } from "react-icons/bi";
import Swal from "sweetalert2";

type Inputs = {
    doctorname: string,
    doctorphone: string,
    doctorcity: string,
    doctorphoto: string,
    ticketprice: Number
};

type NewEmergencyDoctorType = {
    _id?: string,
    doctorName: string,
    doctorPhone: string,
    doctorCity: string,
    doctorPhoto: string,
    ticketPrice: Number
};

const AddEmergencyDoctor = () => {
    let [isOpen, setIsOpen] = useState(false);

    const { data: emergencyDoctors = [], refetch } = useQuery({
        queryKey: ["emergencyDoctors"],
        queryFn: async () => {
            try {
                const response = await axios.get('/api/emergencydoctors');
                return response?.data;
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });

    const {data: doctors = [], refetch: doctorsRefetch} = useQuery({
        queryKey: ['doctors'],
        queryFn: async() => {
            try {
                const response = await axios.get('/api/users');
                return response?.data?.filter((doctor) => (doctor?.role === 'Doctor' && doctor?.doctorRole === 'Regular Doctor'));
            } catch (error:any) {
                console.log(error?.message);
            }
        }
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const doctor = doctors.find((doctor) => doctor?._id === data?.doctorname);

        try {
            const newEmergencyDoctor: NewEmergencyDoctorType = {
                doctorName: doctor?.name,
                doctorPhone: data?.doctorphone,
                doctorCity: data?.doctorcity,
                doctorPhoto: doctor?.profilePic,
                ticketPrice: Number(data?.ticketprice)
            };

            const response = await axios.post('/api/emergencydoctors', newEmergencyDoctor);

            if (response.status === 201) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "New Emergency Doctor Has Been Added...",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
                refetch();
                setIsOpen(false);

                await axios.patch(`/api/users/email/${doctor?.email}`);

                doctorsRefetch();
            }

        } catch (error: any) {
            console.log(error?.message);
        }
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleDeleteEmergencyDoctor = async (id: string) => {
        Swal.fire({
            title: "Are you sure to release?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, release the doctor!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`/api/emergencydoctors/${id}`);
                    if (response.status === 200) {
                        refetch();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Emergency Doctor Has Been Released!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }


    return (
        <div className="py-20 w-full min-h-screen bg-gray-100">
            <div className="flex justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="bg-sky-500 px-4 py-2 text-white text-lg font-medium rounded-sm flex justify-center items-center gap-3">
                    <span>Add New Emergency Doctor </span>
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
                                            Add New Emergency Doctor
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="mb-5">
                                                    <label htmlFor="doctorname" className="block text-base font-medium text-gray-900">
                                                        Doctor Name:
                                                    </label>

                                                    <select
                                                        {...register("doctorname", { required: true })}
                                                        id="doctorname"
                                                        className="ps-2 mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-2 border-2"
                                                        placeholder="Dr. John Doe..."
                                                    >
                                                        {
                                                            doctors?.map((doctor) => <option key={doctor?._id} value={doctor?._id}>
                                                                {doctor?.name}
                                                            </option>)
                                                        }
                                                    </select>
                                                    {errors.doctorname && <p className="mt-2 text-red-600">Doctor Name Is Required...</p>}
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="doctorphone" className="block text-base font-medium text-gray-900">
                                                        Doctor Phone Number:
                                                    </label>

                                                    <input
                                                        {...register("doctorphone", { required: true })}
                                                        id="doctorphone"
                                                        className="ps-2 mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-2 border-2"
                                                        placeholder="+880XXXXXXXXXX"
                                                    />
                                                    {errors.doctorphone && <p className="mt-2 text-red-600">Doctor Phone Is Required...</p>}
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="doctorcity" className="block text-base font-medium text-gray-900">
                                                        Doctor City:
                                                    </label>

                                                    <select
                                                        {...register("doctorcity", { required: true })}
                                                        id="doctorcity"
                                                        className="ps-2 py-2 mt-2 w-full rounded-lg border-2 border-gray-300 align-top shadow-sm sm:text-sm"
                                                    >
                                                        <option value={`Sylhet`}>Sylhet</option>
                                                        <option value={`Dhaka`}>Dhaka</option>
                                                        <option value={`Chittagong`}>Chittagong</option>
                                                    </select>

                                                    {errors.doctorcity && <p className="mt-2 text-red-600">Doctor City Is Required...</p>}
                                                </div>
                                                <div className="mt-4">
                                                    <label htmlFor="ticketprice" className="block text-base font-medium text-gray-900">
                                                        Ticket Price:
                                                    </label>
                                                    <input
                                                        {...register("ticketprice", { required: true })}
                                                        type="number"
                                                        id="ticketprice"
                                                        className="mt-1.5 ps-2 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-2 border-2"
                                                        placeholder="Ticket Price..."
                                                    />
                                                    {errors.ticketprice && <p className="mt-2 text-red-600">Ticket Price Field Is Required...</p>}
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
            <h2 className="text-2xl font-semibold text-center mt-14">Emergency Doctors</h2>
            <div className="max-w-7xl mx-auto mt-12 flex flex-wrap justify-center items-center gap-12">
                {
                    emergencyDoctors?.map((emergencyDoctor: NewEmergencyDoctorType, index: number) => {
                        return (
                            <div key={index} className="w-96 h-72 group relative block bg-white cursor-pointer shadow-xl rounded">
                                <div className="relative p-4 sm:p-6 lg:p-6">
                                    <div className="flex justify-between items-start">
                                        <div className="relative w-48 h-32 bg-gray-300">
                                            <Image fill={true} src={emergencyDoctor?.doctorPhoto} alt="Emergency Doctor" className="w-full h-full object-cover object-top p-1" />
                                        </div>
                                        <button onClick={() => handleDeleteEmergencyDoctor(emergencyDoctor?._id)} className="bg-red-600 text-white px-6 py-1 text-lg rounded-sm absolute top-0 right-0">Release</button>
                                    </div>
                                    <h4 className="pt-5 text-base font-semibold uppercase tracking-widest text-sky-600">
                                        {emergencyDoctor.doctorName}
                                    </h4>
                                    <p className="text-xl font-medium text-black sm:text-base mt-3 tracking-wider">
                                        <span
                                            className="whitespace-nowrap rounded-full bg-yellow-400 px-2.5 py-1 text-sm text-black"
                                        >
                                            {emergencyDoctor?.doctorCity}
                                        </span>
                                    </p>
                                    <p className="text-sm font-medium text-black mt-5 tracking-wider">
                                        {emergencyDoctor?.doctorPhone}
                                    </p>
                                    <div className="absolute bottom-2 right-0 bg-green-600 py-2 px-4 rounded-br">
                                        <div>
                                            <p className="text-base font-medium text-white">
                                                Price: ${String(emergencyDoctor?.ticketPrice)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    );
};

export default AddEmergencyDoctor;