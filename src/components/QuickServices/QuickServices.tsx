import Image from "next/image";
import wave from '../../../public/images/wave (1).svg';
import bmiImage from '../../../public/images/bmi.png';
import calorieImage from '../../../public/images/calories.png';
import medicalHeartImage from '../../../public/images/medical-heart.png';
import Link from "next/link";

const QuickServices = () => {
    return (
        <div className="w-full relative -top-24">
            <div className="w-full" >
                <Image src={wave} alt="wave" className="w-full h-[600px] object-cover" />
                <div className="w-full absolute top-40 px-20">
                    <h2 className="text-3xl font-semibold text-white mt-20">
                        Quick Health Tools {">>"}
                    </h2>
                    <div className="my-16 h-full flex justify-center gap-20">
                        <Link href='/healthtools/bmi-calculator'>
                            <div className="bg-white flex flex-col justify-center items-center gap-3 w-[338px] py-4 rounded shadow-sm">
                                <div className="relative w-32 h-32">
                                    <Image fill={true} src={bmiImage} alt="BMI Calculator" className="w-full h-full object-cover" />
                                </div>
                                <h4 className="text-2xl font-medium text-center">BMI Calculator</h4>
                            </div>
                        </Link>
                        <Link href='/healthtools/calories-converter'>
                            <div className="bg-white flex flex-col justify-center items-center gap-3 w-[338px] py-4 rounded shadow-sm">
                                <div className="relative w-32 h-32">
                                    <Image fill={true} src={calorieImage} alt="Calories Converter" className="w-full h-full object-cover" />
                                </div>
                                <h4 className="text-2xl font-medium text-center">
                                    Calories Converter
                                </h4>
                            </div>
                        </Link>
                        <Link href='/healthtools/ideal-heart-rate'>
                            <div className="bg-white flex flex-col justify-center items-center gap-3 w-[338px] py-4 rounded shadow-sm">
                                <div className="relative w-32 h-32">
                                    <Image fill={true} src={medicalHeartImage} alt="Ideal Heart Rate Teller" className="w-full h-full object-cover" />
                                </div>
                                <h4 className="text-2xl font-medium text-center">
                                    Ideal Heart Rate Teller
                                </h4>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuickServices