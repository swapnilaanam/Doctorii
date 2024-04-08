"use client"

import { Dialog, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiMessageSquareAdd } from "react-icons/bi";
import Swal from "sweetalert2";

type Inputs = {
    diagnosisName: string,
    diagnosedArea: string,
    diagnosisDetails: string,
    price: Number
};

type NewDiagnosisType = {
    diagnosisName: string,
    diagnosedArea: string,
    diagnosisDetails: string,
    price: Number
};

const AddDiagnosis = () => {
    let [isOpen, setIsOpen] = useState(false);

    const { data: diagnoses = [], refetch } = useQuery({
        queryKey: ["diagnoses"],
        queryFn: async () => {
            try {
                const response = await axios.get('/api/diagnoses');
                return response?.data;
            } catch (error) {
                console.log(error);
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
        const newDiagnosis: NewDiagnosisType = {
            diagnosisName: data?.diagnosisName,
            diagnosedArea: data?.diagnosedArea,
            diagnosisDetails: data?.diagnosisDetails,
            price: data?.price
        }

        try {
            const response = await axios.post('/api/diagnoses', newDiagnosis);
            if (response?.status === 201) {
                refetch();
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'New Diagnosis Added!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.log(error);
        }
    }


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleDeleteDiagnosis = async (id: string) => {
        try {
            const response = await axios.delete(`/api/diagnoses/${id}`);
            if (response?.status === 200) {
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Diagnosis Is Deleted!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="py-20 w-full min-h-screen bg-gray-100">
            <div className="flex justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="bg-sky-500 px-4 py-2 text-white text-lg font-medium rounded-sm flex justify-center items-center gap-3">
                    <span>Add New Diagnosis </span>
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
                                            Add New Diagnosis
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="mb-5">
                                                    <label htmlFor="diagnosisName" className="block text-base font-medium text-gray-900">
                                                        Diagnosis Name:
                                                    </label>

                                                    <input
                                                        {...register("diagnosisName", { required: true })}
                                                        id="diagnosisName"
                                                        className="ps-2 mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-2 border-2"
                                                    />
                                                    {errors.diagnosisName && <p className="mt-2 text-red-600">Diagnosis Name Is Required...</p>}
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="diagnosedArea" className="block text-base font-medium text-gray-900">
                                                        Diagnosed Area:
                                                    </label>

                                                    <input
                                                        {...register("diagnosedArea", { required: true })}
                                                        id="diagnosedArea"
                                                        className="ps-2 mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-2 border-2"
                                                    />
                                                    {errors.diagnosedArea && <p className="mt-2 text-red-600">Diagnosed Area Is Required...</p>}
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="diagnosisDetails" className="block text-base font-medium text-gray-900">
                                                        Diagnosis Details:
                                                    </label>

                                                    <textarea
                                                        {...register("diagnosisDetails", { required: true })}
                                                        id="diagnosisDetails"
                                                        className="ps-2 mt-2 w-full rounded-lg border-2 border-gray-300 align-top shadow-sm sm:text-sm"
                                                        rows={4}
                                                        placeholder="Enter Details..."
                                                    ></textarea>

                                                    {errors.diagnosisDetails && <p className="mt-2 text-red-600">Diagnosis Details Is Required...</p>}
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
            <h2 className="text-2xl font-semibold text-center mt-14">Your Added Diagnoses</h2>
            <div className="max-w-7xl mx-auto mt-12 flex flex-wrap justify-center items-center gap-12">
                {
                    diagnoses?.map((diagnosis, index: number) => {
                        return (
                            <div key={index} className="w-96 h-64 group relative block bg-white cursor-pointer shadow-xl">
                                <div className="relative p-4 sm:p-6 lg:p-8">
                                    <div className="flex justify-between">
                                        <p className="text-base font-semibold uppercase tracking-widest text-sky-600">
                                            {diagnosis.diagnosisName}
                                        </p>
                                        <button onClick={() => handleDeleteDiagnosis(diagnosis?._id)} className="bg-red-600 text-white px-4 py-1 text-lg rounded-sm">Delete</button>
                                    </div>
                                    <p className="text-xl font-medium text-black sm:text-base mt-3 tracking-wider">
                                        <span
                                            className="whitespace-nowrap rounded-full bg-yellow-400 px-2.5 py-1 text-sm text-black"
                                        >
                                            {diagnosis?.diagnosedArea}
                                        </span>
                                    </p>
                                    <p className="text-sm font-medium text-black mt-5 tracking-wider">
                                        {diagnosis?.diagnosisDetails}
                                    </p>
                                    <div className="mt-3">
                                        <div
                                            className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                                        >
                                            <p className="text-base font-medium text-black">
                                                Price: ${diagnosis?.price}
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

export default AddDiagnosis;