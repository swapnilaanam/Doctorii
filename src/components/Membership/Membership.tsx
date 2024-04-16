'use client';

import useIsPatient from "@/hooks/useIsPatient";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Membership = () => {

    const [isPatient, isPatientLoading] = useIsPatient();
    const session = useSession();
    const router = useRouter();

    const handleBecomeMember = (planName, planPrice) => {
        if(!(session?.data?.user)) {
            return Swal.fire("LogIn To Use This Feature!");
        }

        if(!isPatientLoading && !isPatient) {
            return Swal.fire("Only Patient Can Subscribe To Our Membership!")
        }

        Swal.fire({
            title: "Do you want to take membership?",
            text: `You will be charged $${planPrice}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Become Member"
        }).then((result) => {
            if (result.isConfirmed) {
                let membershipDetails;

                if(planName === 'Starter') {
                    membershipDetails = {
                        name: session?.data?.user?.name,
                        email: session?.data?.user?.email,
                        planName: planName,
                        planPrice: planPrice,
                        isEmergencyDoctor: true,
                        isFreeDiagnosis: true,
                        diagnosisDiscount: 5,
                    }
                }

                if(planName === 'Intermadiate') {
                    membershipDetails = {
                        name: session?.data?.user?.name,
                        email: session?.data?.user?.email,
                        planName: planName,
                        planPrice: planPrice,
                        isEmergencyDoctor: true,
                        isFreeDiagnosis: true,
                        diagnosisDiscount: 10,
                    }
                }

                if(planName === 'Premium') {
                    membershipDetails = {
                        name: session?.data?.user?.name,
                        email: session?.data?.user?.email,
                        planName: planName,
                        planPrice: planPrice,
                        isEmergencyDoctor: true,
                        isFreeDiagnosis: true,
                        diagnosisDiscount: 10,
                        isFreeDoctorAppointment: true,
                        doctorAppointmentDiscount: 5,
                    }
                }

                localStorage.setItem('membershipInfo', JSON.stringify(membershipDetails));

                router.push('/membership/payment');
            }
        });
    }

    return (
        <div className="py-20 xl:py-32 px-4 lg:px-12 xl:px-0">
            <h2 className="text-3xl font-semibold text-center text-sky-600 mb-14">Our Membership Package</h2>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 lg:items-center md:gap-8">
                    <div
                        className="rounded-2xl border border-green-400 p-6 shadow-sm sm:px-8 lg:p-12"
                    >
                        <div className="text-center">
                            <h2 className="text-3xl font-semibold text-green-600">
                                Starter
                                <span className="sr-only">Plan</span>
                            </h2>

                            <p className="mt-2 sm:mt-4">
                                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                    7$
                                </strong>

                                <span className="text-sm font-medium text-gray-700">/year</span>
                            </p>
                        </div>

                        <ul className="mt-6 space-y-2">
                            <li className="flex md:justify-center xl:justify-normal items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-5 w-5 text-sky-700"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700"> Free Access To Emergency Doctor </span>
                            </li>

                            <li className="flex md:justify-center xl:justify-normal items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-5 w-5 text-sky-700"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700"> 5% Discount On Diagnosis</span>
                            </li>
                        </ul>

                        <div className="flex justify-center item-center">
                            <button
                                onClick={() => handleBecomeMember('Starter', 7)}
                                className="mt-8 block rounded-full border border-sky-600 bg-sky-600 px-12 py-3 text-center text-base font-medium text-white hover:ring-1 hover:ring-sky-600 focus:outline-none focus:ring active:text-sky-500"
                            >
                                Become Member
                            </button>
                        </div>
                    </div>
                    <div
                        className="rounded-2xl border border-sky-300 p-6 shadow-sm ring-1 ring-indigo-600 sm:px-8 lg:p-12"
                    >
                        <div className="text-center">
                            <h2 className="text-3xl font-semibold text-green-600">
                                Premium
                                <span className="sr-only">Plan</span>
                            </h2>

                            <p className="mt-2 sm:mt-4">
                                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                    20$
                                </strong>

                                <span className="text-sm font-medium text-gray-700">/year</span>
                            </p>
                        </div>

                        <ul className="mt-6 space-y-2">
                            <li className="flex md:justify-center xl:justify-normal items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-5 w-5 text-sky-700"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700"> Free Access To Emergency Doctor </span>
                            </li>

                            <li className="flex md:justify-center xl:justify-normal items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-5 w-5 text-sky-700"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700"> 5% Discount On Doctor Appointment </span>
                            </li>

                            <li className="flex md:justify-center xl:justify-normal items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-5 w-5 text-sky-700"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700"> 10% Discount On Diagnosis </span>
                            </li>
                        </ul>

                        <div className="flex justify-center item-center">
                            <button
                                onClick={() => handleBecomeMember('Premium', 20)}
                                className="mt-8 block rounded-full border border-sky-600 bg-sky-600 px-12 py-3 text-center text-base font-medium text-white hover:bg-sky-600 hover:ring-1 hover:ring-sky-700 focus:outline-none focus:ring active:text-sky-500"
                            >
                                Become Member
                            </button>
                        </div>
                    </div>
                    <div
                        className="rounded-2xl border border-green-400 p-6 shadow-sm sm:px-8 lg:p-12"
                    >
                        <div className="text-center">
                            <h2 className="text-3xl font-semibold text-green-600">
                                Intermediate
                                <span className="sr-only">Plan</span>
                            </h2>

                            <p className="mt-2 sm:mt-4">
                                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                    12$
                                </strong>

                                <span className="text-sm font-medium text-gray-700">/year</span>
                            </p>
                        </div>

                        <ul className="mt-6 space-y-2">
                            <li className="flex md:justify-center xl:justify-normal items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-5 w-5 text-sky-700"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700"> Free Access To Emergency Doctor </span>
                            </li>

                            <li className="flex md:justify-center xl:justify-normal items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-5 w-5 text-sky-700"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>

                                <span className="text-gray-700"> 10% Discount On Diagnosis </span>
                            </li>
                        </ul>

                        <div className="flex justify-center item-center">
                            <button
                                onClick={() => handleBecomeMember('Intermadiate', 12)}
                                className="mt-8 block rounded-full border border-sky-600 bg-sky-600 px-12 py-3 text-center text-base font-medium text-white hover:ring-1 hover:ring-sky-600 focus:outline-none focus:ring active:text-sky-500"
                            >
                                Become Member
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Membership;