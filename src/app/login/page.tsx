"use client";

import Link from "next/link";
import Lottie from 'lottie-react';

import authAnimation from '../../../public/animation/auth.json';
import { useForm, SubmitHandler } from "react-hook-form";

import { AiOutlineGoogle } from "react-icons/ai";

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type loginInputType = {
    email: string,
    password: string,
}

const Login = () => {
    const router = useRouter();
    const session = useSession();

    const [isHistoryExist, setIsHistoryExits] = useState();

    useEffect(() => {
        const isHistory = localStorage.getItem('history');

        if (isHistory) {
            const prevHis = localStorage.getItem('history');
            setIsHistoryExits(prevHis);
        }
    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm<loginInputType>();

    const onSubmit: SubmitHandler<loginInputType> = async (data) => {
        const result = await signIn("credentials", { redirect: false, email: data.email, password: data.password });

        if(result?.error) {
            return Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Wrong Email Or Password! Try Again!",
                showConfirmButton: false,
                timer: 1500
              });
        }
    }

    if (session?.status === 'loading') {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
            </div>
        )
    }

    if (session?.status === 'authenticated') {
        if (isHistoryExist) {
            localStorage.removeItem('history');
            return router.push(isHistoryExist);
        }

        return router.push('/');
    }

    return (
        <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center items-center lg:items-stretch">
            <div className="bg-sky-600 w-full lg:w-1/2 flex justify-center items-center">
                <Lottie animationData={authAnimation} loop={true} className="h-[90%]" />
            </div>
            <div className="bg-white w-full lg:w-1/2 pt-16 flex flex-col items-center justify-center">
                <h1 className="text-3xl md:text-4xl text-center text-sky-600 font-semibold tracking-wider">Welcome To Doctorii</h1>
                <h4 className="mt-5 text-3xl md:text-4xl font-medium text-sky-600 tracking-wider">Login</h4>
                <div className="mt-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mx-4 lg:mx-0">
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
                                    Login
                                </span>
                            </button>
                        </div>
                    </form>
                    <div className="mt-12 flex justify-center items-center gap-5">
                        <hr className="w-1/2 border-t-2" />
                        <span className="text-2xl text-sky-600">Or</span>
                        <hr className="w-1/2 border-t-2" />
                    </div>
                    <div className="text-center mt-10">
                        <button
                            className="group relative inline-flex items-center overflow-hidden rounded bg-sky-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-sky-500"
                            onClick={() => signIn("google")}
                        >
                            <span className="absolute -end-full transition-all group-hover:end-4">
                                <AiOutlineGoogle className="h-5 w-5 rtl:rotate-180" />
                            </span>
                            <span className="text-base font-medium transition-all group-hover:me-4">
                                Google Login As Patient
                            </span>
                        </button>
                        <p className="text-red-700 mt-4">** Google Login For Doctor Not Allowed...</p>
                    </div>
                    <div className="flex justify-center items-center mt-7 mb-10 text-xl">
                        <h4>{`Doesn't`} Have An Account?</h4>
                        <Link href="/register" className="text-sky-600 font-medium ms-2">Register.</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

