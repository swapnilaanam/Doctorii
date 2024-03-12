"use client";

import Link from "next/link";
import { GrLogout, GrScheduleNew, GrSchedules } from "react-icons/gr";
import { FaUserDoctor, FaUsers } from "react-icons/fa6";
import { BiHomeSmile } from "react-icons/bi";
import { TbReportMedical } from "react-icons/tb";
import { IoIosPersonAdd } from "react-icons/io";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";
import useIsDoctor from "@/hooks/useIsDoctor";
import useIsPatient from "@/hooks/useIsPatient";
import useIsAdmin from "@/hooks/useIsAdmin";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Sidebar = () => {
    const session = useSession();

    const { data: user = {}, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            if (session?.data?.user) {
                try {
                    const response = await axios.get(`/api/users/email/${session?.data?.user?.email}`);
                    return response?.data;
                } catch (error: any) {
                    console.log(error?.message);
                }
            }
        }
    });

    const [isDoctor, isDoctorLoading] = useIsDoctor();
    const [isPatient, isPatientLoading] = useIsPatient();
    const [isAdmin, isAdminLoading] = useIsAdmin();

    return (
        <div className="flex min-h-screen w-16 flex-col justify-between border-e bg-sky-500">
            <div>
                <div className="inline-flex h-16 w-16 items-center justify-center">
                    <span
                        className="grid h-10 w-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600"
                    >
                        D
                    </span>
                </div>

                <div className="border-t border-gray-100">
                    <div className="px-2">
                        <div className="py-4">
                            <div>
                                <Link
                                    href="/dashboard"
                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                                >
                                    <FaUserDoctor className="text-black" />
                                    <span
                                        className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                    >
                                        Dashboard
                                    </span>
                                </Link>
                            </div>
                        </div>

                        <ul className="space-y-1 border-t border-gray-100 pt-4">
                            {
                                (!isDoctorLoading && isDoctor) && <>
                                    {
                                        user?.doctorRole !== 'Emergency' && (
                                            <>
                                                <li>
                                                    <Link
                                                        href="/dashboard/addschedule"
                                                        className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                                                    >
                                                        <GrScheduleNew />
                                                        <span
                                                            className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                                        >
                                                            Add Schedule
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/dashboard/appointments"
                                                        className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                                                    >
                                                        <GrSchedules />

                                                        <span
                                                            className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                                        >
                                                            Appointments
                                                        </span>
                                                    </Link>
                                                </li>
                                            </>
                                        )
                                    }
                                    {
                                        user?.doctorRole === 'Emergency' && (
                                            <li>
                                                <Link
                                                    href="/dashboard/chat"
                                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                                                >
                                                    <IoChatbubbleEllipsesOutline className="text-black" />
                                                    <span
                                                        className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                                    >
                                                        Chat
                                                    </span>
                                                </Link>
                                            </li>
                                        )
                                    }
                                </>
                            }
                            {
                                (!isPatientLoading && isPatient) && <>
                                    <li>
                                        <Link
                                            href="/dashboard/patientappointments"
                                            className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                                        >
                                            <GrSchedules />

                                            <span
                                                className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                            >
                                                Appointments
                                            </span>
                                        </Link>
                                    </li>
                                </>
                            }
                            {
                                (!isAdminLoading && isAdmin) && <>
                                    <li>
                                        <Link
                                            href="/dashboard/manageusers"
                                            className="group relative flex justify-center rounded px-2 py-1.5 text-black hover:bg-gray-200 hover:text-black"
                                        >
                                            <FaUsers />

                                            <span
                                                className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                            >
                                                Manage Users
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/dashboard/adddiagnosis"
                                            className="group relative flex justify-center rounded px-2 py-1.5 text-black hover:bg-gray-200 hover:text-black"
                                        >
                                            <TbReportMedical />

                                            <span
                                                className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                            >
                                                Add Diagnosis
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/dashboard/addemergencydoctor"
                                            className="group relative flex justify-center rounded px-2 py-1.5 text-black hover:bg-gray-200 hover:text-black"
                                        >
                                            <IoIosPersonAdd />

                                            <span
                                                className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                            >
                                                Add EmergencyDoctor
                                            </span>
                                        </Link>
                                    </li>
                                </>
                            }
                            <li className="pt-3">
                                <Link
                                    href="/"
                                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                                >
                                    <BiHomeSmile className="text-black text-lg" />

                                    <span
                                        className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                                    >
                                        Back To Home
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-sky-500 p-2">
                <div>
                    <button
                        onClick={() => signOut()}
                        className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    >
                        <GrLogout />

                        <span
                            className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100"
                        >
                            Logout
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;