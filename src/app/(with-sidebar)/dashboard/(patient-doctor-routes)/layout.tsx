'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useIsPatient from '@/hooks/useIsPatient';
import useIsDoctor from '@/hooks/useIsDoctor';
import { signOut, useSession } from 'next-auth/react';
import Swal from 'sweetalert2';

const PatientDoctorRoutesLayout = ({ children }: { children: React.ReactNode }) => {
    const [isPatient, isPatientLoading] = useIsPatient();
    const [isDoctor, isDoctorLoading] = useIsDoctor();
    const router = useRouter();
    const pathName = usePathname();
    const session = useSession();

    const handleSignOut = () => {
        signOut();
    }

    useEffect(() => {
        if (session?.status === 'unauthenticated') {
            localStorage.setItem('history', pathName);
            Swal.fire('Login With Your Patient Or Doctor Account To Use This Feature!');
            return router.push('/login');
        }

        if ((!isPatientLoading && !isDoctorLoading) && ((!isPatient && !isDoctor) && session?.status === 'authenticated')) {
            localStorage.setItem('history', pathName);
            return handleSignOut();
        }

        if ((!isPatientLoading && !isDoctorLoading) && ((isPatient || isDoctor) && session?.status === 'authenticated')) {
            localStorage.removeItem('history');
        }
    }, [isPatient, isDoctor, pathName, session?.status, isPatientLoading, isDoctorLoading, router]);

    if (isPatientLoading || isDoctorLoading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <span className="loading loading-infinity w-20"></span>
            </div>
        )
    };

    return children;
}

export default PatientDoctorRoutesLayout;