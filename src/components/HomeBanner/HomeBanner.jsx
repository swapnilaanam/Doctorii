"use client"

import Lottie from 'lottie-react';
import bannerAnimation from '../../../public/animation/banner-animation.json';
import Link from 'next/link';

const HomeBanner = () => {
    return (
        <section className="bg-white flex">
            <div className="mx-auto max-w-screen-xl px-4 py-28 lg:flex lg:h-[610px] lg:items-center">
                <div className="text-center mx-10">
                    <h1 className="text-2xl font-extrabold sm:text-5xl">
                        Book Doctors Appointment.
                        <strong className="font-extrabold text-sky-600 mt-5 sm:block">
                            With A Click From Home.
                        </strong>
                    </h1>
                    <p className="mt-8 mx-14 font-medium sm:text-xl">
                        With The Best Doctors From Your Locality, Getting Their Appointment Has Never Been
                        That Easy!
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-7">
                        <Link href="/doctors"
                            className="block w-full rounded bg-sky-600 px-14 py-3 text-xl font-medium text-white shadow hover:bg-sky-700 focus:outline-none focus:ring active:bg-sky-600 sm:w-auto"
                        >
                            Doctors
                        </Link>

                        <Link
                            className="block w-full rounded bg-green-600 hover:bg-green-700 px-14 py-3 text-xl font-medium text-white shadow hover:text-gray-200 focus:outline-none focus:ring active:text-white sm:w-auto"
                            href="/diagnosis"
                        >
                            Diagnosis
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-1/2">
                <Lottie animationData={bannerAnimation} loop={true} className="min-h-[600px]" />
            </div>
        </section>
    );
};

export default HomeBanner;