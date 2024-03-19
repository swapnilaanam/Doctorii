'use client';

import Image from "next/image";
import wave from '../../../public/images/wave (1).svg';
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type EmergencyDoctorType = {
    _id: string,
    doctorName: string,
    doctorPhone: string,
    doctorCity: string,
    doctorPhoto: string,
    ticketPrice: string
}

const EmergencyDoctors = () => {
    const { data: emergencyDoctors = [] } = useQuery({
        queryKey: ["emergencyDoctors"],
        queryFn: async () => {
            try {
                const response = await axios.get('/api/emergencydoctors');
                if (response.status === 200) {
                    return response?.data;
                }
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    })

    return (
        <div className="w-full relative -top-40">
            <div className="w-full" >
                <Image src={wave} alt="wave" className="w-full h-[500px] object-cover" />
                <div className="w-full absolute top-32 px-20">
                    <h2 className="text-3xl font-semibold text-white mt-20">Emergency Doctors {">>"}</h2>
                    <div className="my-14 h-full flex justify-center gap-20">
                        {emergencyDoctors.length === 0 ? <h2 className="text-center text-3xl font-medium text-white">
                            No Emergency Doctor Avaialable Right Now...
                        </h2>
                            : (
                                emergencyDoctors?.map((emergencyDoctor: EmergencyDoctorType) => {
                                    return (
                                        <Link href={`/chat/${encodeURIComponent(emergencyDoctor?.doctorName)}`} key={emergencyDoctor?._id}>
                                            <div className="border-4 border-yellow-300 rounded-full w-32 h-32">
                                                <Image src={emergencyDoctor?.doctorPhoto} alt="Emergency Doctor" width={100} height={100} className="w-full h-full object-cover rounded-full" />
                                            </div>
                                        </Link>
                                    )
                                })
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencyDoctors;