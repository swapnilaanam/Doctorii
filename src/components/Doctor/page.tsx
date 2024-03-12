import Image from "next/image";
import Link from "next/link";

interface TimeSlot {
    weekDays: string[],
    scheduleTime: string,
    price: string
};

type DoctorType = {
    _id: string,
    name: string,
    email: string,
    profilePic: string,
    password: string,
    role: string,
    doctorRole: string,
    timeSlots: TimeSlot[]
};

const Doctor = ({ doctor }: { doctor: DoctorType }) => {
    return (
        <div className="group relative block h-64 sm:h-80 lg:h-96 hover: cursor-pointer">
            <span className="absolute inset-0 border-2 border-dashed border-black"></span>

            <div
                className="relative flex h-full transform items-end border-2 border-black bg-white transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"
            >
                <div
                    className="w-96 p-4 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-6 lg:p-8"
                >
                    <div className="w-full h-full absolute top-0 bottom-0 left-0">
                        <Image fill={true} src={doctor?.profilePic} alt={doctor?.name} className="w-full h-full object-cover" />
                    </div>
                    <h2 className="absolute bottom-7 mt-4 bg-white px-6 py-2 text-xl font-medium sm:text-2xl rounded-sm">Dr. {doctor?.name}</h2>
                </div>

                <div
                    className="w-96 absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8"
                >
                    <h3 className="mt-4 text-2xl font-medium sm:text-2xl">Dr. {doctor?.name}</h3>

                    <div className="flex justify-center items-center flex-wrap gap-4 mt-5">
                        {
                            doctor?.timeSlots.length === 0 ? (
                                <h4 className="text-center text-xl font-medium py-5">
                                    No Schedules Are Available Now
                                </h4>
                            ) : (
                                doctor?.timeSlots?.map((timeSlot, index) => {
                                    if (index < 3) {
                                        return (
                                            <div key={index} className="bg-green-600 text-white text-xl px-5 py-2 rounded">
                                                {timeSlot?.scheduleTime}
                                            </div>
                                        )
                                    }
                                })
                            )
                        }
                    </div>
                    <div className="text-center text-xl font-semibold tracking-widest">
                        ...
                    </div>
                    <Link href={`/booking/${doctor?._id}`}>
                        <button className="bg-sky-600 text-white text-xl px-5 py-2 mt-8 rounded">Book Appointment</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Doctor