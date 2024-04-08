"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from 'next/image';
import Swal from "sweetalert2";

const ManageUsers = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            try {
                const response = await axios.get('/api/users');
                if (response?.status === 200) {
                    return response?.data;
                }
            } catch (error) {
                console.log(error);
            }
        }
    });

    const handleMakeAdmin = async (id: string) => {
        try {
            const response = await axios.patch(`/api/users/id/${id}`, {role: 'Admin'});
            if (response?.status === 200) {
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User Role Updated To Admin!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="py-20 w-full min-h-screen bg-gray-100">
            <h2 className="text-2xl font-semibold text-center mb-12 text-sky-600">Manage Users</h2>
            <div className="max-w-7xl mx-auto overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-md shadow-2xl border">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-lg text-gray-900">
                                Image
                            </th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-lg text-gray-900">
                                Name
                            </th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-lg text-gray-900">
                                Email
                            </th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-lg text-gray-900">
                                Role
                            </th>
                            <th className="px-4 py-3"></th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-center">
                        {
                            users.length === 0 ? <tr>
                                <td>No users Found...</td>
                            </tr>
                                :
                                users.map((user: any) => {
                                    return (
                                        <tr key={user?._id}>
                                            <td className="whitespace-nowrap px-4 py-3 flex justify-center">
                                                <Image src={user?.profilePic} width={32} height={32} alt="profilePic" />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                                                {user?.name}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                                                {user?.email}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                                                {user?.role}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3">
                                                {
                                                    user?.role !== 'Admin' && <button
                                                        className="inline-block rounded bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600"
                                                        onClick={() => handleMakeAdmin(user?._id)}
                                                    >
                                                        Make Admin
                                                    </button>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;