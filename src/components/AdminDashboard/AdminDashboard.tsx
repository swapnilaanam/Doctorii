'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AdminDashboard = () => {
    const {data: doctors = []} = useQuery({
        queryKey: ['doctors'],
        queryFn: async() => {
            try {
                const response = await axios.get('/api/users/doctors');

                if(response?.status === 200) {
                    return response?.data;
                }
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });

    const {data: patients = []} = useQuery({
        queryKey: ['patients'],
        queryFn: async() => {
            try {
                const response = await axios.get('/api/users/patients');

                if(response?.status === 200) {
                    return response?.data;
                }
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });

    const {data: emergencyDoctors = []} = useQuery({
        queryKey: ['emergencyDoctors'],
        queryFn: async() => {
            try {
                const response = await axios.get('/api/users/emergencydoctors');

                if(response?.status === 200) {
                    return response?.data;
                }
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });

    const {data: memberships = []} = useQuery({
        queryKey: ['memberships'],
        queryFn: async() => {
            try {
                const response = await axios.get('/api/memberships');

                if(response?.status === 200) {
                    return response?.data;
                }
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });

    const {data: appointments = []} = useQuery({
        queryKey: ['appointments'],
        queryFn: async() => {
            try {
                const response = await axios.get('/api/appointments');

                if(response?.status === 200) {
                    return response?.data;
                }
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });

    const {data: bookedDiagnoses = []} = useQuery({
        queryKey: ['bookedDiagnoses'],
        queryFn: async() => {
            try {
                const response = await axios.get('/api/bookings');

                if(response?.status === 200) {
                    return response?.data;
                }
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });

    return (
        <section className="py-20 bg-gray-100">
            <div className="max-w-7xl mx-auto min-h-screen">
                <h2 className="text-center text-4xl font-bold pb-20">Admin Dashboard</h2>
                <div className="flex flex-wrap justify-center items-center gap-20">
                    <div className="bg-sky-600 text-white w-[400px] h-40 text-3xl font-semibold flex justify-center items-center rounded hover:bg-sky-700 hover:cursor-pointer">
                        <span>
                            {
                                doctors?.length
                            }
                        </span>
                        <span className="ms-4">
                            Registered Doctors
                        </span>
                    </div>
                    <div className="bg-green-600 text-white w-[400px] h-40 text-3xl font-semibold flex justify-center items-center rounded hover:bg-green-700 hover:cursor-pointer">
                        <span>
                            {
                                patients?.length
                            }
                        </span>
                        <span className="ms-4">
                            Registered Patients
                        </span>
                    </div>
                    <div className="bg-yellow-400 w-[400px] text-gray-800 h-40 text-3xl font-semibold flex justify-center items-center rounded hover:bg-yellow-500 hover:cursor-pointer">
                        <span>
                            {
                                emergencyDoctors?.length
                            }
                        </span>
                        <span className="ms-4">
                            Emergency Doctors
                        </span>
                    </div>
                    <div className="bg-sky-600 text-white w-[400px] h-40 text-3xl font-semibold flex justify-center items-center rounded hover:bg-sky-700 hover:cursor-pointer">
                        <span>
                            {
                                memberships?.length
                            }
                        </span>
                        <span className="ms-4">
                            Membership Patients
                        </span>
                    </div>
                    <div className="bg-green-600 text-white w-[400px] h-40 text-3xl font-semibold flex justify-center items-center rounded hover:bg-green-700 hover:cursor-pointer">
                        <span>
                            {
                                appointments?.length
                            }
                        </span>
                        <span className="ms-4">
                            Booked Appointments
                        </span>
                    </div>
                    <div className="bg-yellow-400 text-gray-800 w-[400px] h-40 text-3xl font-semibold flex justify-center items-center rounded hover:bg-yellow-500 hover:cursor-pointer">
                        <span>
                            {
                                bookedDiagnoses?.length
                            }
                        </span>
                        <span className="ms-4">
                            Booked Diagnoses
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminDashboard