'use client';

import useIsPatient from "@/hooks/useIsPatient";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const BookingTicketPageLayout = ({children}: {children: React.ReactNode}) => {
    const router = useRouter();
    const pathName = localStorage.getItem('prevHistory');
    const [isPatient, isPatientLoading] = useIsPatient();

    if (!isPatientLoading && !isPatient) {
        Swal.fire('Booking ticket for a diagnosis is only allowed for patients! Kindly, LogIn with your patients account!');
        return router.push(pathName);
    }

    return children;
}

export default BookingTicketPageLayout;