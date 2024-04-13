'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';

type TypeDiagnosis = {
    _id: string,
    diagnosisName: string,
    diagnosedArea: string,
    diagnosisDetails: string,
    price: number
}

const MostBookedDiagnosis = () => {
    const { data: diagnoses = [] } = useQuery({
        queryKey: ["diagnoses"],
        queryFn: async () => {
            try {
                const response = await axios.get('/api/diagnoses');
                if (response?.status === 200) {
                    const diagnoses = response?.data.slice(0, 4);
                    return diagnoses;
                }
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <section className="bg-sky-50 py-20">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div
                    className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:justify-between lg:items-center"
                >
                    <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
                        <h2 className="text-3xl text-sky-600 font-semibold sm:text-4xl">
                            Most Booked Diagnosis
                        </h2>
                        <Link
                            href="/diagnosis"
                            className="mt-12 inline-block rounded bg-sky-600 px-12 py-3 text-xl font-medium text-white transition hover:bg-sky-700 focus:outline-none focus:ring focus:ring-yellow-400"
                        >
                            Find All Diagnosis
                        </Link>
                    </div>

                    {
                        diagnoses?.length === 0 ? (
                            <h4 className="text-center text-sky-600 text-2xl font-semibold">
                                No Diagnosis Tests Are Available Now.
                            </h4>
                        ) : (
                            <div className="grid grid-cols-2 gap-10">
                                {
                                    diagnoses.map((diagnosis: TypeDiagnosis) => {
                                        return (
                                            <div
                                                key={diagnosis._id}
                                                className="bg-white block rounded-md border border-sky-100 p-4 shadow-sm hover:border-sky-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring text-center"
                                            >
                                                <h2 className="mt-2 font-semibold text-xl text-green-600">{diagnosis?.diagnosisName}</h2>
                                                <p className="hidden sm:mt-1 sm:block sm:text-lg sm:text-black">
                                                    {diagnosis?.diagnosedArea}
                                                </p>
                                                <div className="mt-4 flex justify-between items-center gap-2">
                                                    <Link
                                                        className="inline-block rounded bg-yellow-400 px-6 py-2 text-sm font-medium text-black transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-sky-500"
                                                        href={`/diagnosis/details/${diagnosis._id}`}
                                                    >
                                                        Details
                                                    </Link>
                                                    <Link
                                                        className="inline-block rounded bg-sky-600 px-7 py-2 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
                                                        href={`/diagnosis/bookticket/${diagnosis._id}`}
                                                    >
                                                        Book Ticket
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </section >
    );
};

export default MostBookedDiagnosis;