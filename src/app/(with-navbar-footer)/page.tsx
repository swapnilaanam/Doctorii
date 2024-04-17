'use client';

import CustomerReviews from "@/components/CustomerReviews/CustomerReviews";
import EmergencyDoctors from "@/components/EmergencyDoctors/EmergencyDoctors";
import FeaturedDoctors from "@/components/FeaturedDoctors/FeaturedDoctors";
import HomeBanner from "@/components/HomeBanner/HomeBanner";
import Membership from "@/components/Membership/Membership";
import MostBookedDiagnosis from "@/components/MostBookedDiagnosis/MostBookedDiagnosis";
import JoinAsDoctorBanner from "@/components/JoinAsDoctorBanner/JoinAsDoctorBanner";
import OurServices from "@/components/OurServices/OurServices";
import QuickServices from "@/components/QuickServices/QuickServices";
import HealthBlogs from "@/components/HealthBlogs/HealthBlogs";
import Faqs from "@/components/Faqs/Faqs";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  useEffect(() => {
    // console.log(session?.data?.user);
    localStorage.removeItem('history');
  }, [session?.data?.user]);

  return (
    <div>
      <HomeBanner />
      <EmergencyDoctors />
      <OurServices />
      <JoinAsDoctorBanner />
      <FeaturedDoctors />
      <MostBookedDiagnosis />
      <Membership />
      <QuickServices />
      <CustomerReviews />
      <HealthBlogs />
      <Faqs />
    </div>
  )
}
