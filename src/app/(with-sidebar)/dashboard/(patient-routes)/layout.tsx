'use client';

import React, { useEffect } from 'react';
import useIsPatient from '@/hooks/useIsPatient';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Swal from 'sweetalert2';

const ClientRoutesLayout = ({ children }: { children: React.ReactNode }) => {
    const [isPatient, isPatientLoading] = useIsPatient();
    const router = useRouter();
    const pathName = usePathname();
    const session = useSession();

    const handleSignOut = () => {
        signOut();
    }

    useEffect(() => {
        if (session?.status === 'unauthenticated') {
            localStorage.setItem('history', pathName);
            Swal.fire('Login With Your Patient Account To Use This Feature!');
            return router.push('/login');
        }

        if (!isPatientLoading && (!isPatient && session?.status === 'authenticated')) {
            localStorage.setItem('history', pathName);
            return handleSignOut();
        }
        if (!isPatientLoading && (isPatient && session?.status === 'authenticated')) {
            localStorage.removeItem('history');
        }
    }, [isPatient, isPatientLoading, pathName, router, session?.status]);

    if (isPatientLoading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <span className="loading loading-infinity w-20"></span>
            </div>
        )
    }

    return children;
}

export default ClientRoutesLayout;