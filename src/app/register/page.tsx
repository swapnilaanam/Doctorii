"use client"

import Lottie from "lottie-react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

import authAnimation from '../../../public/animation/auth.json';
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

type registerInputType = {
    name: string,
    email: string,
    password: string,
    profilepic: any,
    role: string
}

type newUserType = {
    name: string,
    email: string,
    password: string,
    profilePic: string,
    role: string,
    doctorRole?: string,
    timeSlots?: any[]
}

const Register = () => {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<registerInputType>();

    const onSubmit: SubmitHandler<registerInputType> = async (data) => {
        const image = data.profilepic[0];

        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'rthkcuo4');
        formData.append('clould_name', 'dgywo1wwg')

        let imgURL: string;

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dgywo1wwg/image/upload`, formData,);
            imgURL = response?.data?.url;

            let newUser: newUserType;

            if (data.role === 'Doctor') {
                newUser = {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    profilePic: imgURL,
                    role: data.role,
                    doctorRole: "Regular Doctor",
                    timeSlots: []
                }
            }
            else {
                newUser = {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    profilePic: imgURL,
                    role: data.role
                }
            }

            const response2 = await axios.post('http://localhost:3000/api/auth/register', newUser);

            if (response2.status === 201) {
                Swal.fire("User Registered Successfully");
                return router.push('/login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center items-center lg:items-stretch">
            <div className="bg-white w-full lg:w-1/2 pt-10 flex flex-col items-center justify-center">
                <h4 className="text-3xl lg:text-4xl font-medium text-sky-600 tracking-wider">Register</h4>
                <div className="mt-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mx-4 lg:mx-0">
                            <label
                                htmlFor="name"
                                className="relative block rounded-md border-2 border-gray-200 shadow-md focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                            >
                                <input
                                    type="text"
                                    id="name"
                                    {...register("name", { required: true })}
                                    className="w-full lg:w-[450px] h-14 ps-2 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                                    placeholder="name"
                                />

                                <span
                                    className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-2xl font-medium text-gray-800 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-xl peer-focus:top-0 peer-focus:text-base"
                                >
                                    Name
                                </span>
                            </label>
                            {errors.name && <span className="mt-2 text-red-700">Name field is required</span>}
                        </div>

                        <div className="mt-8 mx-4 lg:mx-0">
                            <label
                                htmlFor="email"
                                className="relative block rounded-md border-2 border-gray-200 shadow-md focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                            >
                                <input
                                    type="text"
                                    id="email"
                                    {...register("email", { required: true })}
                                    className="w-full lg:w-[450px] h-14 ps-2 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                                    placeholder="email"
                                />

                                <span
                                    className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-2xl font-medium text-gray-800 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-xl peer-focus:top-0 peer-focus:text-base"
                                >
                                    Email
                                </span>
                            </label>
                            {errors.email && <span className="mt-2 text-red-700">Email field is required</span>}
                        </div>

                        <div className="mt-8 mx-4 lg:mx-0">
                            <label
                                htmlFor="password"
                                className="relative block rounded-md border-2 border-gray-200 shadow-md focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                            >
                                <input
                                    type="password"
                                    id="password"
                                    {...register("password", { required: true })}
                                    className="w-full lg:w-[450px] h-14 ps-2 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                                    placeholder="password"
                                />

                                <span
                                    className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-2xl font-medium text-gray-800 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-xl peer-focus:top-0 peer-focus:text-base"
                                >
                                    Password
                                </span>
                            </label>
                            {errors.password && <span className="mt-2 text-red-700">Password field is required</span>}
                        </div>

                        <div className="mt-8 mx-4 lg:mx-0">
                            <label
                                htmlFor="profilepic"
                                className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                            >
                                <span className="text-xl font-medium text-gray-800"> Profile Picture </span>

                                <input
                                    type="file"
                                    id="profilepic"
                                    {...register("profilepic", { required: true })}
                                    className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                />
                            </label>
                            {errors.profilepic && <span className="mt-2 text-red-700">Profile Picture field is required</span>}
                        </div>

                        <div className="mt-8 mx-4 lg:mx-4">
                            <fieldset className="grid grid-cols-2 gap-7">
                                {/* <legend className="sr-only">Role</legend> */}

                                <div>
                                    <input
                                        type="radio"
                                        {...register("role")}
                                        value="Patient"
                                        id="Patient"
                                        className="peer hidden [&:checked_+_label_svg]:block"
                                        defaultChecked
                                    />

                                    <label
                                        htmlFor="Patient"
                                        className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="text-gray-800">Patient</p>

                                            <svg
                                                className="hidden h-5 w-5 text-blue-600"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </label>
                                </div>

                                <div>
                                    <input
                                        type="radio"
                                        {...register("role")}
                                        value="Doctor"
                                        id="Doctor"
                                        className="peer hidden [&:checked_+_label_svg]:block"
                                    />

                                    <label
                                        htmlFor="Doctor"
                                        className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="text-gray-800">Doctor</p>

                                            <svg
                                                className="hidden h-5 w-5 text-blue-600"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </label>
                                </div>
                            </fieldset>
                        </div>

                        <div className="mt-10 flex justify-center items-center">
                            <button
                                className="group relative inline-block overflow-hidden border-2 border-sky-600 px-36 lg:px-40 py-2.5 focus:outline-none focus:ring"
                                type="submit"
                            >
                                <span
                                    className="absolute inset-y-0 left-0 w-[2px] bg-sky-600 transition-all duration-700 ease-in-out group-hover:w-full group-active:bg-sky-500"
                                ></span>

                                <span
                                    className="relative text-lg font-medium text-sky-600 transition-colors group-hover:text-white"
                                >
                                    Register
                                </span>
                            </button>
                        </div>
                    </form>

                    <div className="flex justify-center items-center mt-7 mb-12 text-xl">
                        <h4>Already Have An Account?</h4>
                        <Link href="/login" className="text-sky-600 font-medium ms-2">Login.</Link>
                    </div>
                </div>
            </div>
            <div className="bg-sky-600 w-full lg:w-1/2 flex justify-center items-center">
                <Lottie animationData={authAnimation} loop={true} className="h-[90%]" />
            </div>
        </div>
    );
};

export default Register;