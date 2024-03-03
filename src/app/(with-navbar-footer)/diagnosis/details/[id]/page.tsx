'use client'

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation"

const DiagnosisDetails = () => {
    const { id } = useParams();

    const { data: diagnosisInfo = {} } = useQuery({
        queryKey: ['diagnosisInfo', id],
        queryFn: async () => {
            if (id) {
                try {
                    const response = await axios.get(`/api/diagnoses/${id}`);
                    console.log(response?.data);
                    return response?.data;
                } catch (error: any) {
                    console.log(error?.message);
                }
            }
        }
    });

    return (
        <section className="py-28 max-w-5xl mx-auto mb-28">
            <div className="bg-sky-100 p-14 flex justify-center items-start">
                <div className="space-y-4 flex-1">
                    <h2 className="text-xl font-semibold">
                        Diagnosis Name:
                        <span className="ps-2 font-normal">{diagnosisInfo?.diagnosisName}</span>
                    </h2>
                    <h2 className="text-xl font-semibold">
                        Diagnosed Area:
                        <span className="ps-2 font-normal">{diagnosisInfo?.diagnosedArea}</span>
                    </h2>
                    <h2 className="text-xl font-semibold">Price:
                        <span className="ps-2 font-normal">{diagnosisInfo?.price}</span>
                    </h2>
                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-semibold">
                        Details:
                    </h2>
                    <p className="text-xl">{diagnosisInfo?.diagnosisDetails}</p>
                </div>
            </div>
            <div className="text-center mt-12">
                <Link href={`/diagnosis/bookticket/${id}`} className="text-white bg-green-600 text-xl px-12 py-3 text rounded-sm">
                    Book Ticket
                </Link>
            </div>
        </section>
    )
}

export default DiagnosisDetails;