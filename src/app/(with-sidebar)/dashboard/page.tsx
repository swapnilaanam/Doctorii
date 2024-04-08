"use client";

import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import DoctorDashboard from "@/components/DoctorDashboard/DoctorDashboard";
import PatientDashboard from "@/components/PatientDashboard/PatientDashboard";
import useIsAdmin from "@/hooks/useIsAdmin";
import useIsDoctor from "@/hooks/useIsDoctor";
import useIsPatient from "@/hooks/useIsPatient";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
    const [isDoctor, isDoctorLoading] = useIsDoctor();
    const [isPatient, isPatientLoading] = useIsPatient();
    const [isAdmin, isAdminLoading] = useIsAdmin();

    const pathName = usePathname();
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.status === 'unauthenticated') {
            localStorage.setItem('history', pathName);
        }
        else {
            localStorage.removeItem('history');
        }
    }, [pathName, router, session?.status]);

    if (session?.status === 'unauthenticated') {
        return router.push('/login');
    }

    return (
        <div>
            {(!isDoctorLoading && isDoctor) && <DoctorDashboard />}
            {(!isPatientLoading && isPatient) && <PatientDashboard />}
            {(!isAdminLoading && isAdmin) && <AdminDashboard />}
        </div>
    );
};

export default Dashboard;