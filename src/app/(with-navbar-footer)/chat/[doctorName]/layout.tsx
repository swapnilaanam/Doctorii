'use client';

import useIsPatient from "@/hooks/useIsPatient"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import { useEffect } from "react";
import Swal from "sweetalert2";

const ChatPageLayout = ({ children }: { children: React.ReactNode }) => {
    const [isPatient, isPatientLoading] = useIsPatient();

    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        const email = session?.data?.user?.email;

        if (email) {
            axios.get(`/api/memberships/${email}`)
                .then((res) => {
                    if (res?.status === 200) {
                        if (!(res?.data)) {
                            Swal.fire("Emergency chats are only available for membership patients!");
                            return router.push('/');
                        }
                    }
                })
        }
    }, [session?.data?.user?.email]);

    if (!isPatientLoading && !isPatient) {
        Swal.fire("Emergency chats are only available for membership patients!")
        return redirect('/');
    }

    return (
        <>
            {children}
        </>
    )
};

export default ChatPageLayout;