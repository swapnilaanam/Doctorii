'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useIsAdmin from '@/hooks/useIsAdmin';
import { signOut, useSession } from 'next-auth/react';
import Swal from 'sweetalert2';

const AdminRoutesLayout = ({ children }: { children: React.ReactNode }) => {
    const [isAdmin, isAdminLoading] = useIsAdmin();
    const router = useRouter();
    const pathName = usePathname();
    const session = useSession();

    const handleSignOut = () => {
        signOut();
    }

    useEffect(() => {
        if(session?.status === 'unauthenticated') {
            localStorage.setItem('history', pathName);
            Swal.fire('Login With Your Admin Account To Use This Feature!');
            return router.push('/login');
        }

        if (!isAdminLoading && (!isAdmin && session?.status === 'authenticated')) {
            localStorage.setItem('history', pathName);
            return handleSignOut();
        }

        if(!isAdminLoading && (isAdmin && session?.status === 'authenticated')) {
            localStorage.removeItem('history');
        }
    }, [isAdmin, isAdminLoading, pathName, router, session?.status]);

    if (isAdminLoading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <span className="loading loading-infinity w-20"></span>
            </div>
        )
    };

    return children;
}

export default AdminRoutesLayout;