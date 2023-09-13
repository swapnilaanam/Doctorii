"use client";

import CheckOutForm from "@/components/CheckOutForm/CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PAYMENT_KEY);

const Payment = () => {
    const [appointmentInfo, setAppointmentInfo] = useState({});

    useEffect(() => {
       const newAppointment = localStorage.getItem("newAppointment");
       console.log(newAppointment);
       setAppointmentInfo(JSON.parse(newAppointment));
    }, []);

 
    return (
        <div className="py-24 w-full h-[620px] bg-green-50">
            <h4 className="text-2xl font-semibold text-center mt-16 mb-10">Make Your Payment</h4>
            <div className="flex justify-center">
                {
                        <Elements stripe={stripePromise}>
                            <CheckOutForm appointmentInfo={appointmentInfo} price={appointmentInfo?.ticketPrice}/>
                        </Elements>
                }
            </div>
        </div >
    );
};

export default Payment;