'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useIsDoctor from '@/hooks/useIsDoctor';
import { signOut, useSession } from 'next-auth/react';
import Swal from 'sweetalert2';

const DoctorRoutesLayout = ({ children }: { children: React.ReactNode }) => {
    const [isDoctor, isDoctorLoading] = useIsDoctor();
    const session = useSession();
    const router = useRouter();
    const pathName = usePathname();

    const handleSignOut = () => {
        signOut();
    }

    useEffect(() => {
        if (session?.status === 'unauthenticated') {
            localStorage.setItem('history', pathName);
            Swal.fire('Login With Your Doctor Account To Use This Feature!');
            return router.push('/login');
        }

        if (!isDoctorLoading && (!isDoctor && session?.status === 'authenticated')) {
            localStorage.setItem('history', pathName);
            return handleSignOut();
        }

        if (!isDoctorLoading && (isDoctor && session?.status === 'authenticated')) {
            localStorage.removeItem('history');
        }
    }, [isDoctor, isDoctorLoading, pathName, router, session?.status]);

    if (isDoctorLoading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <span className="loading loading-infinity w-20"></span>
            </div>
        )
    };

    return children;
}

export default DoctorRoutesLayout;