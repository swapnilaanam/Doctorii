"use client";

import CheckOutForm from "@/components/CheckOutForm/CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PAYMENT_KEY);

// console.log(process.env.NEXT_PUBLIC_PAYMENT_KEY);

const Payment = () => {
    const [appointmentInfo, setAppointmentInfo] = useState({});
    const router = useRouter();

    useEffect(() => {
        const newAppointment = localStorage.getItem("newAppointment");
        //    console.log(JSON.parse(newAppointment));
        setAppointmentInfo(JSON.parse(newAppointment));
    }, []);

    useEffect(() => {
        const his = localStorage.getItem('newAppointment');
        if(!his) {
            return router.back();
        }
    }, [router]);

    return (
        <div className="py-24 w-full h-[620px] bg-sky-50">
            <h4 className="text-2xl font-semibold text-center mt-16 mb-10">Make Your Payment</h4>
            <div className="flex justify-center">
                {
                    <Elements stripe={stripePromise}>
                        <CheckOutForm appointmentInfo={appointmentInfo} price={appointmentInfo?.ticketPrice} />
                    </Elements>
                }
            </div>
        </div >
    );
};

export default Payment;