import Link from "next/link"
import FAQ from "../FAQ/FAQ"

const Faqs = () => {
  return (
    <section className="py-20">
      <h2 className="text-3xl text-sky-600 text-center font-semibold">Frequently Asked Questions</h2>
      <div className="space-y-4 py-20 max-w-5xl mx-auto">
        <FAQ question="How much time is needed for diagnosis test result to appear?" answer="Normally it takes 3-5 days to have the test result available on the website. For some tests it might take some additional time." />
        <FAQ question="How can we show the doctor that we have an appointment with him?" answer="You will have just go the dashboard of our website and from the appointment section just show the doctor your appointment details. He will also have your info in his dashboard." />
        <FAQ question="Where the diagnosis test will be done?" answer={["After successfully booking a diagnosis test, you will have to visit the following", <Link key={1} href="/address" className="mx-1 font-semibold text-sky-600"> address </Link>, "for the test."]} />
        <FAQ question="Does COS(Cash On Service) works for doctor appointments?" answer="No, currently we accept only online card pre-payment for doctors appointment." />
      </div>
    </section>
  )
}

export default Faqs