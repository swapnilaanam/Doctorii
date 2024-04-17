'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";


const HealthBlogDetails = () => {
    const { id } = useParams();

    const { data: healthBlogDetails = {} } = useQuery({
        queryKey: ['healthBlogDetails'],
        queryFn: async () => {
            try {
                const response = await axios.get(`/api/healthblogs/${id}`);

                if (response?.status === 200) {
                    return response?.data;
                }
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });

    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto bg-sky-100 flex flex-col lg:flex-row justify-between items-start p-7 md:p-12 gap-12 lg:gap-20">
                <div className="hidden lg:block relative flex-1 h-[400px] bg-gray-100">
                    <Image fill={true} src={healthBlogDetails?.newsThumbnail} alt={healthBlogDetails?.newsTitle} className="hidden md:block w-full h-full object-cover p-1.5" />
                </div>

                <div className="md:hidden w-full flex justify-center">
                    <Image src={healthBlogDetails?.newsThumbnail} alt={healthBlogDetails?.newsTitle} width={300} height={300} style={{ objectFit: "cover" }} />
                </div>

                <div className="hidden lg:hidden w-full md:flex justify-center">
                    <Image src={healthBlogDetails?.newsThumbnail} alt={healthBlogDetails?.newsTitle} width={600} height={250} style={{ objectFit: "cover" }} />
                </div>
                <div className="flex-1">
                    <h2 className="text-3xl text-gray-900 font-semibold text-justify leading-snug mt-4">
                        {healthBlogDetails?.newsTitle}
                    </h2>
                    <p className="text-lg text-gray-700 mt-10 text-justify">
                        {healthBlogDetails?.newsDetails}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default HealthBlogDetails