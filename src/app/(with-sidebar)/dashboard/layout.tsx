'use client';

import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const pathName = usePathname();
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if(session?.status === 'unauthenticated') {
            router.push('/login');
            localStorage.setItem('dashboardHistory', pathName);
        }
    })

    return children;
}

export default DashboardLayout;