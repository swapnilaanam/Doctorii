'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BookTicket = () => {
  const { id } = useParams();

  const session = useSession();

  const router = useRouter();

  const [membershipDiscount, setMembershipDiscount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const { data: diagnosisInfo } = useQuery({
    queryKey: ['diagnosisInfo', id],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/diagnoses/${id}`);
        return response?.data;
      } catch (error: any) {
        console.log(error?.message);
      }
    }
  });

  const { data: membershipInfo = {} } = useQuery({
    queryKey: ['membershipInfo', session?.data?.user?.email],
    queryFn: async () => {
      if (session?.data?.user?.email) {
        try {
          const response = await axios.get(`/api/memberships/${session?.data?.user?.email}`);

          if (response?.status === 200) {
            return response?.data;
          }
        } catch (error: any) {
          console.log(error?.message);
        }
      }
    }
  });

  useEffect(() => {
    const diagnosisDiscount = Number(((diagnosisInfo?.price * membershipInfo?.diagnosisDiscount) / 100).toFixed(2));

    setMembershipDiscount(diagnosisDiscount);

    const discountedTotal = diagnosisInfo?.price - diagnosisDiscount;

    setSubTotal(discountedTotal);
  }, [diagnosisInfo?.price, membershipInfo?.diagnosisDiscount]);


  const handleBookingTicket = async (e: Event) => {
    e.preventDefault();

    const bookedDate = e?.target?.bookdate?.value;

    if (!bookedDate) {
      return;
    }

    let newBooking;

    if (membershipInfo) {
      newBooking = {
        diagnosisName: diagnosisInfo?.diagnosisName,
        diagnosedArea: diagnosisInfo?.diagnosedArea,
        customerName: session?.data?.user?.name,
        customerEmail: session?.data?.user?.email,
        ticketPrice: subTotal,
        bookedDate
      };
    } else {
      newBooking = {
        diagnosisName: diagnosisInfo?.diagnosisName,
        diagnosedArea: diagnosisInfo?.diagnosedArea,
        customerName: session?.data?.user?.name,
        customerEmail: session?.data?.user?.email,
        ticketPrice: diagnosisInfo?.price,
        bookedDate
      };
    }

    localStorage.setItem('newBooking', JSON.stringify(newBooking));

    router.push(`/diagnosis/payment/${id}`);
  };

  return (
    <section className="py-20 max-w-7xl mx-auto">
      <div className="">
        <h2 className="text-2xl font-semibold text-center mb-12">Book Ticket</h2>
        <div>
          <form onSubmit={(e) => handleBookingTicket(e)} className="flex flex-col items-center gap-5">
            <div className="space-x-5 w-[500px] flex">
              <label htmlFor="diagnosisname" className="text-right flex-1 text-xl font-medium">
                Diagnosis Name:
              </label>
              <input type="text" id="diagnosisname" name="diagnosisname" className="flex-1 border border-sky-500 px-2 rounded-sm w-[180px]" value={diagnosisInfo?.diagnosisName} readOnly />
            </div>
            <div className="space-x-5 w-[500px] flex">
              <label htmlFor="diagnosisprice" className="text-right flex-1 text-xl font-medium">
                Diagnosis Price:
              </label>
              <input type="text" id="diagnosisprice" name="diagnosisprice" className="flex-1 border border-sky-500 px-2 rounded-sm w-[180px]" value={`$ ${diagnosisInfo?.price}`} readOnly />
            </div>
            {
              membershipInfo ? (
                <>
                  <div className="space-x-5 w-[500px] flex">
                    <label htmlFor="diagnosisprice" className="text-right flex-1 text-xl font-medium">
                      Membership Discount:
                    </label>
                    <input type="text" id="diagnosisprice" name="diagnosisprice" className="flex-1 border border-sky-500 px-2 rounded-sm w-[180px]" value={`$ - ${membershipDiscount}`} readOnly />
                  </div>
                  <div className="space-x-5 w-[500px] flex">
                    <label htmlFor="diagnosisprice" className="text-right flex-1 text-xl font-medium">
                      Total After Discount:
                    </label>
                    <input type="text" id="diagnosisprice" name="diagnosisprice" className="flex-1 border border-sky-500 px-2 rounded-sm w-[180px]" value={`$ ${subTotal}`} readOnly />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-x-5 w-[500px] flex">
                    <label htmlFor="diagnosisprice" className="text-right flex-1 text-xl font-medium">
                      Membership Discount:
                    </label>
                    <input type="text" id="diagnosisprice" name="diagnosisprice" className="flex-1 border border-sky-500 px-2 rounded-sm w-[180px]" value={`$ - ${0.00}`} readOnly />
                  </div>
                  <div className="space-x-5 w-[500px] flex">
                    <label htmlFor="diagnosisprice" className="text-right flex-1 text-xl font-medium">
                      Total After Discount:
                    </label>
                    <input type="text" id="diagnosisprice" name="diagnosisprice" className="flex-1 border border-sky-500 px-2 rounded-sm w-[180px]" value={`$ ${diagnosisInfo?.price}`} readOnly />
                  </div>
                </>
              )
            }
            <div className="space-x-5 w-[500px] flex">
              <label htmlFor="bookdate" className="text-right flex-1 text-xl font-medium">
                Select Date:
              </label>
              <input type="date" id="bookdate" name="bookdate" className="flex-1 border border-sky-500 px-2 rounded-sm w-[180px]" />
            </div>
            <div className="space-x-5 w-[500px] text-center">
              <input type="submit" value="Chekout To Payment" className="bg-green-600 text-white text-lg font-medium px-10 py-2 mt-8 rounded-sm cursor-pointer" />
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default BookTicket;