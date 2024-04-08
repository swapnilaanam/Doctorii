import Image from "next/image"

const About = () => {
    return (
        <section className="py-20">
            <h1 className="text-4xl font-bold text-center mb-5">Our Story</h1>
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
                    <div className="relative z-10 lg:py-16">
                        <div className="relative h-44 sm:h-44 lg:h-full">
                            <Image
                                fill={true}
                                alt=""
                                src="https://www.monash.edu.my/__data/assets/image/0011/3387566/group-surgeons-doing-surgery-hospital-operating-theater-medical-team-doing-critical-operation-group-surgeons-operating-room-with-surgery-equipment-modern-medical-background.jpg"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="relative flex items-center bg-sky-50 rounded">
                        <span
                            className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg:bg-sky-50 rounded"
                        ></span>

                        <div className="p-8 sm:p-16 lg:p-24">
                            <h2 className="text-2xl font-bold sm:text-3xl">
                                We Have Been The Online Medical Service Leader Since 2021
                            </h2>

                            <p className="mt-4 px-2 text-gray-600">
                                Our goal is to cut the hassle of booking an doctor appointment waiting for ours. We brought our online doctor appointment system which takes just few seconds to book an appointment. We are also working to make diagnosis tests more affordable and also bringing all the diagnosis tests in one place.
                            </p>

                            <a
                                href="/address"
                                className="mt-8 inline-block rounded border border-sky-600 bg-sky-600 px-12 py-3 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring active:text-white"
                            >
                                Our Locations
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About