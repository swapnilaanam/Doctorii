"use client"

import Lottie from 'lottie-react';
import bannerAnimation from '../../../public/animation/banner-animation.json';
import Link from 'next/link';

const HomeBanner = () => {
    return (
        <section className="bg-white flex flex-col-reverse xl:flex-row justify-center items-center">
            <div className="mx-auto max-w-screen-xl px-4 xl:py-28 xl:flex xl:h-[610px] xl:items-center">
                <div className="text-center xl:mx-10">
                    <h1 className="text-2xl font-extrabold sm:text-5xl">
                        Book Doctors Appointment.
                        <strong className="ms-2 lg:ms-0 font-extrabold text-sky-600 mt-5 sm:block">
                            With A Click From Home.
                        </strong>
                    </h1>
                    <p className="mt-8 mx-8 lg:mx-14 font-medium sm:text-xl">
                        With The Best Doctors From Your Locality, Getting Their Appointment Has Never Been
                        That Easy!
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-7">
                        <Link href="/doctors"
                            className="relative z-40 w-full rounded bg-sky-600 px-14 py-3 text-xl font-medium text-white shadow hover:bg-sky-700 focus:outline-none focus:ring active:bg-sky-600 sm:w-auto"
                        >
                            Doctors
                        </Link>

                        <Link
                            className="relative z-40 w-full rounded bg-green-600 hover:bg-green-700 px-14 py-3 text-xl font-medium text-white shadow hover:text-gray-200 focus:outline-none focus:ring active:text-white sm:w-auto"
                            href="/diagnosis"
                        >
                            Diagnosis
                        </Link>
                    </div>
                </div>
            </div>
            <div className="py-5 lg:py-0 w-full xl:w-1/2">
                <Lottie animationData={bannerAnimation} loop={true} className="h-full mac:min-h-[600px]" />
            </div>
        </section>
    );
};

export default HomeBanner;