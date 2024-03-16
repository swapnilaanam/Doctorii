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

    return (
        <div className="py-20 bg-gray-100 w-full min-h-screen">
            <h2 className="text-4xl font-semibold text-center">Patient Dashboard</h2>
            <div className="max-w-5xl mx-auto mt-14">
                <h4 className="text-2xl font-medium text-center mb-12">Account Details</h4>
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