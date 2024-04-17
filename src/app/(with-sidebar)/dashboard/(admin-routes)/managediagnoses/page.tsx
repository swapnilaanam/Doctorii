'use client';

import { Dialog, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ManageDiagnoses = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentId, setCurrentId] = useState('');

    const { data: diagnoses = [], refetch } = useQuery({
        queryKey: ['diagnoses'],
        queryFn: async () => {
            try {
                const response = await axios.get('/api/bookings');

                if (response?.status === 200) {
                    return response?.data;
                }
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        const image = data?.diagnosisresult[0];

        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'rthkcuo4');
        formData.append('clould_name', 'dgywo1wwg');

        let imgURL: string;

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dgywo1wwg/image/upload', formData);

            imgURL = response?.data?.url;

            const response2 = await axios.patch(`/api/bookings/id/${currentId}`, { diagnosisResult: imgURL });

            if (response2?.status === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Result is uploaded successfully...",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
                reset();
                setIsOpen(false);
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


    return (
        <section className="px-4 w-full min-h-screen bg-gray-100">
            <h2 className="text-2xl font-semibold text-center pt-14">Manage Diagnoses</h2>
            <div className="max-w-7xl mx-auto mt-14 flex flex-wrap justify-center items-center gap-12">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-sky-100 text-sm rounded border border-sky-200">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-5 py-2 font-semibold text-base text-gray-900">
                                    Diagnosis Name
                                </th>
                                <th className="whitespace-nowrap px-5 py-2 font-semibold text-base text-gray-900">
                                    Diagnosed Area
                                </th>
                                <th className="whitespace-nowrap px-5 py-2 font-semibold text-base text-gray-900">
                                    Ticket Price
                                </th>
                                <th className="whitespace-nowrap px-5 py-2 font-semibold text-base text-gray-900">
                                    Customer Name
                                </th>
                                <th className="px-5 py-2">Result</th>
                                <th className="px-5 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-sky-50">
                            {
                                diagnoses?.map((diagnosis) => {
                                    return (
                                        <tr key={diagnosis?._id} className="text-center">
                                            <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-900 capitalize">
                                                {diagnosis?.diagnosisName}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-700">
                                                {diagnosis?.diagnosedArea}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-700">
                                                ${diagnosis?.ticketPrice}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-700">
                                                {diagnosis?.customerName}
                                            </td>
                                            <td className="whitespace-nowrap px-7 py-2">
                                                {
                                                    diagnosis?.result === 'In Lab' ? (
                                                        <h4 className="whitespace-nowrap px-4 py-2 text-base font-medium text-red-600">
                                                            {diagnosis?.result}
                                                        </h4>
                                                    ) : (
                                                        <Link href={diagnosis?.result || ''} target="_black">
                                                            <button className="inline-block rounded bg-green-600 px-7 py-2 text-sm font-medium text-white hover:bg-green-700 "
                                                            >
                                                                View Result
                                                            </button>
                                                        </Link>
                                                    )
                                                }
                                            </td>
                                            <td className="whitespace-nowrap px-7 py-2">
                                                {
                                                    diagnosis?.result === 'In Lab' ? (
                                                        <button
                                                            className="inline-block rounded bg-green-600 px-7 py-2 text-sm font-medium text-white hover:bg-green-700"
                                                            onClick={() => {
                                                                openModal();
                                                                setCurrentId(diagnosis?._id);
                                                            }}
                                                        >
                                                            Upload Result
                                                        </button>
                                                    ) : (
                                                        <h4 className="whitespace-nowrap px-4 py-2 text-base font-medium text-red-600">
                                                            N/A
                                                        </h4>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
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
                                            Upload Result
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="mb-5">
                                                    <label htmlFor="diagnosisresult" className="block text-base font-medium text-gray-900">
                                                        Diagnosis Result File:
                                                    </label>

                                                    <input
                                                        type="file"
                                                        {...register("diagnosisresult", { required: true })}
                                                        id="diagnosisresult"
                                                        className="ps-2 mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm py-2 border-2"
                                                        placeholder="Dr. John Doe..."
                                                    />
                                                    {errors.diagnosisresult && <p className="mt-2 text-red-600">Diagnosis Result File Is Required...</p>}
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
        </section >
    )
}

export default ManageDiagnoses