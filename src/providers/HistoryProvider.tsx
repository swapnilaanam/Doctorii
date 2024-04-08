'use client';

import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const HistoryContext = createContext(null);

const HistoryProvider = ({ children }: { children: any }) => {
    const pathName = usePathname();
    const [his, setHis] = useState([]);

    useEffect(() => {
        if(pathName !== '/payment' && pathName !=='/login' &&  !pathName.includes('/booking/')) {
            localStorage.removeItem('newAppointment');
        };

        if(pathName !== '/login' && !pathName.includes('/diagnosis/payment/')) {
            localStorage.removeItem('newBooking');
        };

        if(pathName !== '/login' && pathName!== '/membership/payment') {
            localStorage.removeItem('membershipInfo');
        }
    }, [pathName]);

    return (
        <HistoryContext.Provider value={his}>
            {children}
        </HistoryContext.Provider>
    )
};

export default HistoryProvider;