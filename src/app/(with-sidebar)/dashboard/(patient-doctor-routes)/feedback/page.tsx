'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

const Feedback = () => {
    const session = useSession();

    const email = session?.data?.user?.email;

    const {data: userInfo = {}} = useQuery({
        queryKey: ['userInfo', email],
        queryFn: async() => {
            try {
                if(email) {
                    const response = await axios.get(`/api/users/email/${email}`);
                    if(response?.status === 200) {
                        return response?.data;
                    }
                }
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });

    const { data: feedbackInfo = {}, refetch } = useQuery({
        queryKey: ['feedbackInfo', email],
        queryFn: async () => {
            try {
                if (email) {
                    const response = await axios.get(`/api/feedbacks/${email}`);
                    if (response?.status === 200) {
                        return response?.data;
                    }
                }
            } catch (error: any) {
                console.log(error?.message);
            }
        }
    });

    const handleFeedback = async (e: Event) => {
        e.preventDefault();

        const feedbackForm = e.target;

        const feedbackRatings = feedbackForm.ratings.value;
        const feedbackText = feedbackForm.feedback.value;

        const feedback = {
            name: session?.data?.user?.name,
            email: session?.data?.user?.email,
            feedbackRatings,
            feedbackText,
            role: userInfo?.role
        };

        try {
            const response = await axios.post('/api/feedbacks', feedback);

            if (response?.status === 201) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You have successfully given your feedback!",
                    showConfirmButton: false,
                    timer: 1500
                });

                refetch();
                feedbackForm.ratings.value = '';
                feedbackForm.feedback.value = '';
            }
        } catch (error: any) {
            console.log(error?.message);
        }
    };

    return (
        <section>
            {
                feedbackInfo ? (
                    <div className="w-full min-h-screen  bg-gray-200 relative top-0 bottom-0 left-o right-0 flex justify-center items-center text-2xl font-semibold text-center">
                        You have already given feedback!
                    </div>
                ) : (
                    <div className="py-20 max-w-2xl mx-auto flex flex-col items-center">
                        <h2 className="text-2xl font-semibold text-center">
                            Provide Your Feedback
                        </h2>
                        <form onSubmit={(e: any) => handleFeedback(e)} className="py-14 w-full flex flex-col items-center gap-7">
                            <div className="w-[70%] flex flex-col items-start gap-4">
                                <label htmlFor="ratings" className="text-xl font-medium">Rating: </label>
                                <select defaultValue={3} id="ratings" name="ratings" className="w-full bg-sky-100 py-1.5 px-2 rounded">
                                    <option value={1}>
                                        1
                                    </option>
                                    <option value={2}>
                                        2
                                    </option>
                                    <option value={3}>
                                        3
                                    </option>
                                    <option value={4}>
                                        4
                                    </option>
                                    <option value={5}>
                                        5
                                    </option>
                                </select>
                            </div>
                            <div className="w-[70%] flex flex-col items-start gap-4">
                                <label htmlFor="feedback" className="text-xl font-medium">Feedback: </label>
                                <textarea id="feedback" name="feedback" className="w-full bg-sky-100 py-2 px-2 rounded" placeholder="Write your feedback..."></textarea>
                            </div>
                            <div className="w-[70%] text-center">
                                <input type="submit" value="Submit Feedback" className="bg-green-600 text-white px-12 py-2.5 rounded cursor-pointer" />
                            </div>
                        </form>
                    </div>
                )
            }
        </section>
    )
}

export default Feedback;