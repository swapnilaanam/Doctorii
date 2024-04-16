"use client"

import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

import './CustomerReviews.css';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Rating from 'react-rating';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const CustomerReviews = () => {
  const { data: feedbacks = [] } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/feedbacks');

        if (response?.status === 200) {
          return response?.data;
        }
      } catch (error: any) {
        console.log(error?.message);
      }
    }
  });

  return (
    <section className="bg-white relative -top-48 xl:block xl:-top-0">
      <div
        className="mx-auto max-w-7xl px-4 pt-8 pb-44 sm:px-6 lg:px-16 xl:px-6 flex flex-col xl:flex-row justify-center items-center gap-16"
      >
        <div className="w-full xl:w-2/5">
          <h2 className="mt-7 text-5xl font-semibold capitalize text-sky-600 tracking-wider">
            Read trusted reviews from our customers
          </h2>
        </div>
        <div className="w-full xl:w-9/12 flex justify-center !overflow-hidden relative">
          {
            feedbacks?.length === 0 ? (
              <h4 className="text-center text-sky-600 text-2xl font-semibold">
                No Feedbacks Are Available Now.
              </h4>
            ) : (
              <Swiper navigation={true} modules={[Navigation]} className="mySwiper !static mt-28">
                {
                  feedbacks?.map((feedback) => {
                    return (
                      <SwiperSlide key={feedback?._id} className="pt-10 lg:pt-0">
                        <blockquote
                          className="flex h-full flex-col justify-between bg-sky-50 p-12 border-2 border-sky-200 rounded-lg"
                        >
                          <div>
                            <Rating
                              initialRating={feedback?.feedbackRatings}
                              emptySymbol={<FaRegStar className="text-green-600 text-4xl" />}
                              fullSymbol={<FaStar className="text-green-600 text-4xl" />}
                              readonly
                            />
                            <div className="ms-2 mt-7">
                              <h3 className="text-2xl font-semibold text-black">
                                {feedback?.feedbackText}
                              </h3>
                            </div>
                          </div>

                          <footer className="ms-2 mt-7 lg:mt-8 text-gray-600 tracking-wider">
                            <h4 className="text-xl font-medium">- {feedback?.name}</h4>
                            <h4 className="text-xl font-medium">- {feedback?.role}</h4>
                          </footer>
                        </blockquote>
                      </SwiperSlide>
                    )
                  })
                }

              </Swiper>
            )
          }
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;