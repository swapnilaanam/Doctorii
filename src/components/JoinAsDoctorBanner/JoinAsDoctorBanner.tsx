import Image from "next/image";
import wave from '../../../public/images/wave (1).svg';
import doctorBannerImage from '../../../public/images/doctor-nurses-special-equipment.jpg';
import { FaRegSquareCheck } from "react-icons/fa6";
import Link from "next/link";


const JoinAsDoctorBanner = () => {
    return (
        <div className="w-full relative -top-72 xl:-top-32">
            <div className="w-full h-[1000px] md:h-[1100px] xl:h-[600px]" >
                <Image src={wave} alt="wave" className="w-full h-full object-cover" />
                <div className="w-full h-full absolute top-36 md:top-40 lg:top-44 xl:top-24 px-4 lg:px-20 flex flex-col xl:flex-row justify-center items-center gap-14 xl:gap-20">
                    <div className="relative w-full xl:w-[50%] h-[320px]">
                        <Image fill={true} src={doctorBannerImage} alt="Join As An Doctor" className="w-full h-full object-cover bg-white px-2 py-2" />
                    </div>
                    <div className="w-full xl:w-[50%] flex flex-col justify-center items-center">
                        <ul className="text-white text-base md:text-2xl text-center space-y-5">
                            <li className="flex justify-center lg:justify-normal items-center gap-3">
                                <FaRegSquareCheck />
                                <span>Access To Tousands Of Patients.</span>
                            </li>
                            <li className="flex justify-center lg:justify-normal items-center gap-3">
                                <FaRegSquareCheck />
                                <span>Hassle-free Online Visit Fee Collection.</span>
                            </li>
                            <li className="flex justify-center lg:justify-normal items-center gap-3">
                                <FaRegSquareCheck />
                                <span>Easy Appointment Management System.</span>
                            </li>
                        </ul>
                        <Link href="/register" className="mt-12 bg-green-600 text-white text-xl px-16 py-3 font-bold rounded uppercase">
                            Join Us As Doctor
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinAsDoctorBanner;