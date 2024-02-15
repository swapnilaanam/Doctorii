import CustomerReviews from "@/components/CustomerReviews/CustomerReviews";
import EmergencyDoctors from "@/components/EmergencyDoctors/EmergencyDoctors";
import FeaturedDoctors from "@/components/FeaturedDoctors/FeaturedDoctors";
import HomeBanner from "@/components/HomeBanner/HomeBanner";
import Membership from "@/components/Membership/Membership";
import MostBookedDiagnosis from "@/components/MostBookedDiagnosis/MostBookedDiagnosis";
import JoinAsDoctorBanner from "@/components/JoinAsDoctorBanner/JoinAsDoctorBanner";
import OurServices from "@/components/OurServices/OurServices";
import QuickServices from "@/components/QuickServices/QuickServices";

export default function Home() {

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
    </div>
  )
}
