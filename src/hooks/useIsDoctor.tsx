"use client"

import axios from "axios";
import { useSession } from "next-auth/react";
import { useQuery } from '@tanstack/react-query';

const useIsDoctor = () => {

    const session = useSession();
    const email = session?.data?.user?.email;

    const { data: isDoctor = false, isLoading: isDoctorLoading } = useQuery({
        queryKey: ['isDoctor', email],
        queryFn: async () => {
            try {
                if (email) {
                    const response = await axios.get(`/api/users/email/${email}/doctors`);
                    return response?.data;
                }
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    })

    return [isDoctor, isDoctorLoading];
};

export default useIsDoctor;