'use client';

import useIsPatient from "@/hooks/useIsPatient";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const BookingDoctorPageLayout = ({children}: {children: React.ReactNode}) => {
    const router = useRouter();
    const pathName = localStorage.getItem('prevHistory');
    const [isPatient, isPatientLoading] = useIsPatient();

    if (!isPatientLoading && !isPatient) {
        Swal.fire('Booking An Appointment Is Only Allowed For Patients! Kindly, LogIn With Your Patient Account!');
        return router.push(pathName);
    }

    return children;
}

export default BookingDoctorPageLayout;