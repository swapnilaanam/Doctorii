'use client';

import DiagnosisCheckOutForm from "@/components/DiagnosisCheckOutForm/DiagnosisCheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PAYMENT_KEY);



const DiagnosisPayment = () => {
  const [bookingInfo, setBookingInfo] = useState({});
  const router = useRouter();

  useEffect(() => {
    const newBooking = localStorage.getItem("newBooking");
    setBookingInfo(JSON.parse(newBooking));
  }, []);

  useEffect(() => {
    const his = localStorage.getItem('newBooking');
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
            <DiagnosisCheckOutForm bookingInfo={bookingInfo} price={bookingInfo?.ticketPrice} />
          </Elements>
        }
      </div>
    </div >
  )
}

export default DiagnosisPayment;