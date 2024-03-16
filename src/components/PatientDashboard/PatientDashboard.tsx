import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const PatientDashboard = () => {
    const session = useSession();
    const email = session?.data?.user?.email;

    const { data: user = {} } = useQuery({
        queryKey: ['user', email],
        queryFn: async () => {
            const response = await axios.get(`/api/users/email/${email}`);
            return response.data;
        }
    });

    const { data: appointments = [] } = useQuery({
        queryKey: ['appointments', email],
        queryFn: async () => {
            try {
                const response = await axios.get(`/api/appointments/email/${email}?user=patient`);
                return response?.data;
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });

    const { data: diagnoses = [] } = useQuery({
        queryKey: ['diagnoses', email],
        queryFn: async () => {
            try {
                const response = await axios.get(`/api/bookings/email/${email}`);
                return response?.data;
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });

    const { data: membership = {} } = useQuery({
        queryKey: ['membership', email],
        queryFn: async () => {
            try {
                const response = await axios.get(`/api/memberships/${email}`);
                return response?.data;
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });
    return (
        <div className="py-20 bg-gray-100 w-full min-h-screen">
            <h2 className="text-4xl font-semibold text-center">Patient Dashboard</h2>
            <div className="max-w-5xl mx-auto mt-14">
                <div className="flex justify-center items-center gap-12 pb-20 flex-wrap">
                    <div className="bg-sky-500 text-white w-72 h-36 text-3xl font-medium flex justify-center items-center rounded hover:bg-sky-600 hover:cursor-pointer">
                        <span>
                            {
                                appointments?.length
                            }
                        </span>
                        <span className="ms-4">
                            Appointments
                        </span>
                    </div>
                    <div className="bg-green-600 text-white w-72 h-36 text-3xl font-medium flex justify-center items-center rounded hover:bg-green-700 hover:cursor-pointer">
                        <span>
                            {
                                diagnoses?.length
                            }
                        </span>
                        <span className="ms-4">
                            Diagnoses
                        </span>
                    </div>
                    <div className="bg-yellow-400 text-black w-72 h-36 text-3xl font-medium flex justify-center items-center rounded hover:bg-yellow-500 hover:cursor-pointer">
                        {
                            membership ? (
                                <span>
                                    { membership?.planName }
                                </span>
                            ) : (
                                <span>
                                    Not A
                                </span>
                            )
                        }
                        <span className="ms-4">
                            Member
                        </span>
                    </div>
                </div>
                <h4 className="text-3xl font-semibold text-center mb-12">Account Details</h4>
                <div className="space-y-7">
                    <div className="flex gap-5 text-2xl ml-20">
                        <h4>Name: </h4>
                        <h4><strong>{user.name}</strong></h4>
                    </div>
                    <div className="flex gap-5 text-2xl ml-20">
                        <h4>Email: </h4>
                        <h4><strong>{user.email}</strong></h4>
                    </div>
                    <div className="flex gap-9 text-2xl ml-20">
                        <h4>Role: </h4>
                        <h4><strong>{user.role}</strong></h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;