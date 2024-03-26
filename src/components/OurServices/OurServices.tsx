"use client";

import Lottie from 'lottie-react';
import appointmentAnimation from '../../../public/animation/appointment.json';
import diagnosisAnimation from '../../../public/animation/diagnosis.json';
import emergencyAnimation from '../../../public/animation/emergency-doctor.json';
import Link from 'next/link';

const OurServices = () => {
    return (
        <section className="bg-white text-black relative -top-28">
            <div
                className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
            >
                <div className="mx-auto text-center">
                    <h2 className="text-3xl text-sky-600 font-semibold sm:text-4xl">
                        Our Services
                    </h2>

                    <p className="mt-8 text-lg max-w-2xl mx-auto font-medium">
                        The services we offer to our customer covers all the parts of medical services.
                    </p>
                </div>
                <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div
                        className="hover:cursor-pointer block rounded-xl border border-sky-600 p-7 shadow-xl transition hover:border-pink-500/10 hover:shadow-sky-200 text-center"
                    >
                        <div className="flex justify-center">
                            <Lottie animationData={appointmentAnimation} loop={true} className="w-28 h-28" />
                        </div>
                        <h2 className="mt-4 text-2xl font-bold text-green-600">Easy Doctors Appointment</h2>
                        <p className="mt-4 text-base text-black font-medium">
                            You can book doctors appointment according to your time with ease
                        </p>
                    </div>
                    <div
                        className="hover:cursor-pointer block rounded-xl border border-sky-600 p-7 shadow-xl transition hover:border-pink-500/10 hover:shadow-sky-200 text-center"
                    >
                        <div className="flex justify-center">
                            <Lottie animationData={diagnosisAnimation} loop={true} className="w-28 h-28" />
                        </div>
                        <h2 className="mt-4 text-2xl font-bold text-green-600">Book Diagnosis Tests</h2>
                        <p className="mt-4 text-base text-black font-medium">
                            Book your diagnosis tests schedule from home
                        </p>
                    </div>
                    <div
                        className="hover:cursor-pointer block rounded-xl border border-sky-600 p-7 shadow-xl transition hover:border-pink-500/10 hover:shadow-sky-200 text-center"
                    >
                        <div className="flex justify-center">
                            <Lottie animationData={emergencyAnimation} loop={true} className="w-28 h-28" />
                        </div>
                        <h2 className="mt-4 text-2xl font-bold text-green-600">Emergency Doctors</h2>
                        <p className="mt-4 text-base text-black font-medium">
                            Find 24/7 emergency doctors service online through video call
                        </p>
                    </div>
                </div>

                <div className="pt-16 text-center space-x-10">
                    <Link href="/doctors" className="inline-block rounded bg-sky-600 px-12 py-3 text-lg font-medium text-white transition hover:bg-sky-700 focus:outline-none focus:ring focus:ring-green-500"
                    >
                        Find Doctors
                    </Link>
                    <Link href="/diagnosis" className="inline-block rounded bg-green-600 px-12 py-3 text-lg font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500"
                    >
                        Find Diagnosis
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default OurServices;