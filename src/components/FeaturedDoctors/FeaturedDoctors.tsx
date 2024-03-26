"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const FeaturedDoctors = () => {
    const pathName = usePathname();

    const { data: doctors = [] } = useQuery({
        queryKey: ["doctors"],
        queryFn: async () => {
            try {
                const response = await axios.get('/api/users');
                let doctors = response.data.filter((user) => user?.role === "Doctor");
                doctors = doctors.splice(0, 2);
                return doctors;
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });

    useEffect(() => {
        localStorage.setItem('prevHistory', pathName);
    }, [pathName]);

    return (
        <section className="relative -top-14">
            <div className="max-w-7xl px-4 py-8 mx-auto sm:py-28 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-7 lg:grid-cols-3 lg:items-stretch">
                    <div className="grid p-6 bg-sky-600 rounded place-content-center sm:p-8">
                        <div className="max-w-md mx-auto text-center lg:text-left">
                            <header>
                                <h2 className="text-xl font-semibold text-white sm:text-3xl">Featured Doctors</h2>
                                <p className="mt-4 text-gray-100 text-lg">
                                    The Best Doctors Based On Our Customers Reviews
                                </p>
                            </header>

                            <Link
                                href="/doctors"
                                className="inline-block px-12 py-3 mt-8 text-xl font-medium text-sky-600 transition bg-white border border-gray-100 rounded hover:shadow focus:outline-none focus:ring"
                            >
                                See All Doctors
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-2 lg:py-8">
                        <ul className="grid grid-cols-2 gap-7">
                            {
                                doctors.map((doctor) => <li key={doctor._id}>
                                    <div className="block group cursor-pointer">
                                        <div className="w-full h-96 relative">
                                            <Image fill={true} src={doctor?.profilePic} alt="Featured Doctor" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="mt-4 mx-2 flex justify-between items-center">
                                            <div>
                                                <h3
                                                    className="font-medium text-gray-900"
                                                >
                                                    {doctor.name}
                                                </h3>
                                                <p>{doctor.doctorRole}</p>
                                            </div>

                                            <Link href={`/booking/${doctor._id}`} className="bg-yellow-400 px-4 py-2 text-lg font-medium rounded">Book Appointment</Link>
                                        </div>
                                    </div>
                                </li>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedDoctors;