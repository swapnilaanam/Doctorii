'use client';

import Diagnosis from '@/components/Diagnosis/page';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

type DiagnosisType = {
    _id: string,
    diagnosisName: string,
    diagnosedArea: string,
    diagnosisDetails: string,
    price: number
};

const Diagnoses = () => {
    const { data: diagnoses = [] } = useQuery({
        queryKey: ['diagnoses'],
        queryFn: async () => {
            try {
                const response = await axios.get(`/api/diagnoses`);

                if (response?.status === 200) {
                    return response?.data;
                }
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });

    return (
        <section className="py-20">
            <h2 className="text-center text-sky-600 text-3xl font-semibold">Available Diagnoses</h2>
            <div className="flex flex-wrap justify-center items-center gap-x-7 gap-y-14 py-20">
                {
                    diagnoses?.map((diagnosis: DiagnosisType) => <Diagnosis key={diagnosis?._id} diagnosis={diagnosis} />)
                }
            </div>
        </section>
    )
}

export default Diagnoses;