'use client';

import useIsPatient from "@/hooks/useIsPatient";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const BookingDoctorPageLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [pathName, setPathName] = useState();
    const [isPatient, isPatientLoading] = useIsPatient();

    useEffect(() => {
        setPathName(localStorage.getItem('prevHistory'));
    }, []);

    if (!isPatientLoading && !isPatient) {
        Swal.fire('Booking An Appointment Is Only Allowed For Patients! Kindly, LogIn With Your Patient Account!');
        return router.push(pathName);
    }

    return children;
}

export default BookingDoctorPageLayout;