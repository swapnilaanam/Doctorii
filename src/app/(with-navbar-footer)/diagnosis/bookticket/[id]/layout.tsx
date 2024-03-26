'use client';

import useIsPatient from "@/hooks/useIsPatient";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const BookingTicketPageLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [pathName, setPathName] = useState('');
    const [isPatient, isPatientLoading] = useIsPatient();

    useEffect(() => {
        setPathName(localStorage.getItem('prevHistory'));
    }, []);

    if (!isPatientLoading && !isPatient) {
        Swal.fire('Booking ticket for a diagnosis is only allowed for patients! Kindly, LogIn with your patients account!');
        return router.push(pathName);
    }

    return children;
}

export default BookingTicketPageLayout;