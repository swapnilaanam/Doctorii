'use client';

import MembershipCheckOutForm from "@/components/MembershipCheckOutForm/MembershipCheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PAYMENT_KEY);

const MembershipPayment = () => {
  const [membershipInfo, setMembershipInfo] = useState({});

  const router = useRouter();

  useEffect(() => {
    const newMembershipInfo = localStorage.getItem("membershipInfo");
    setMembershipInfo(JSON.parse(newMembershipInfo));
  }, []);

  useEffect(() => {
    axios.get(`/api/memberships/${membershipInfo?.email}`)
    .then((response) => {
      if(response?.status ===200 && response?.data) {
        Swal.fire({
          icon: "error",
          title: "You already have a membership...",
        });

        router.push('/');
      }
    })
  }, [membershipInfo?.email])

  return (
    <div className="py-24 w-full h-[620px] bg-sky-50">
      <h4 className="text-2xl font-semibold text-center mt-16 mb-10">Make Your Payment</h4>
      <div className="flex justify-center">
        {
          <Elements stripe={stripePromise}>
            <MembershipCheckOutForm membershipInfo={membershipInfo} price={membershipInfo?.planPrice} />
          </Elements>
        }
      </div>
    </div >
  )
}

export default MembershipPayment;