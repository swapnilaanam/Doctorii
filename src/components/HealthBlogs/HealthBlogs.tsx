'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

type HealthBlogType = {
    _id: string,
    newsThumbnail: string,
    newsTitle: string,
    newsDetails: string
};

const HealthBlogs = () => {
    const { data: healthBlogs = [] } = useQuery({
        queryKey: ['healthBlogs'],
        queryFn: async () => {
            try {
                const response = await axios.get('/api/healthblogs');

                if (response?.status === 200) {
                    return response?.data?.slice(0, 4);
                }
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });

    return (
        <section className="py-28 bg-sky-50">
            <h2 className="text-3xl font-semibold text-center text-sky-600">
                Health Blog
            </h2>
            <div className="py-20 max-w-7xl mx-auto flex justify-center flex-wrap gap-x-32 gap-y-20">
                {
                    healthBlogs.map((healthBlog: HealthBlogType) => {
                        return (
                            <article key={healthBlog?._id} className="w-[470px] flex bg-white transition hover:shadow-xl border border-gray-200">
                                <div className="hidden sm:block sm:basis-56 relative w-[70%] h-full">
                                    <Image
                                        fill={true}
                                        alt="Health Blog"
                                        src={healthBlog?.newsThumbnail}
                                        className="aspect-square h-full w-full object-cover"
                                    />
                                </div>

                                <div className="flex flex-1 flex-col justify-between">
                                    <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                                        <h3 className="font-bold uppercase text-gray-900">
                                            {healthBlog?.newsTitle}
                                        </h3>
                                        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                                            {healthBlog?.newsDetails.slice(0, 40)}...
                                        </p>
                                    </div>

                                    <div className="sm:flex sm:items-end sm:justify-end">
                                        <Link
                                            href={`/healthblogs/${healthBlog?._id}`}
                                            className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
                                        >
                                            Read Blog
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default HealthBlogs;