import Image from "next/image";
import wave from '../../../public/images/wave (1).svg';
import doctor from '../../../public/images/doctor.jpg';
import doctorBannerImage from '../../../public/images/doctor-nurses-special-equipment.jpg';
import { FaRegSquareCheck } from "react-icons/fa6";
import Link from "next/link";


const JoinAsDoctorBanner = () => {
    return (
        <div className="w-full relative -top-40">
            <div className="w-full h-[600px]" >
                <Image src={wave} alt="wave" className="w-full h-full object-cover" />
                <div className="w-full h-full absolute top-24 px-20 flex justify-center items-center gap-20">
                    <div className="relative w-[50%] h-[320px]">
                        <Image fill={true} src={doctorBannerImage} alt="Join As An Doctor" className="w-full h-full object-cover bg-white px-2 py-2" />
                    </div>
                    <div className="w-[50%] flex flex-col justify-center items-center">
                        <ul className="text-white text-2xl text-center space-y-4">
                            <li className="flex items-center gap-3">
                                <FaRegSquareCheck />
                                <span>Access To Tousands Of Patients.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaRegSquareCheck />
                                <span>Hassle-free Online Visit Fee Collection.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaRegSquareCheck />
                                <span>Easy Appointment Management System.</span>
                            </li>
                        </ul>
                        <Link href="/register" className="mt-10 bg-green-600 text-white text-xl px-12 py-2.5 font-bold rounded">
                            Join Us As A Doctor
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinAsDoctorBanner;