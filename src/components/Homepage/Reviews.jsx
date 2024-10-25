"use client";
import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import axios from 'axios';

const Reviews = () => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/api/getReviews`
        );
        setReviews(data.reviews);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Calculate time ago
  const timeAgo = (reviewDateTime) => {
    const now = new Date();
    const past = new Date(reviewDateTime);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const [key, value] of Object.entries(intervals)) {
      const time = Math.floor(diffInSeconds / value);
      if (time >= 1) {
        return `${time} ${key}${time > 1 ? 's' : ''} ago`;
      }
    }
    return 'just now';
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="py-12 bg-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-black">Reviews</h2>
        <p className="text-center text-secondary mt-2 mb-8">What people Say</p>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {reviews?.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="max-w-sm p-6 bg-white border border-accent rounded-lg shadow-md min-h-72">
                {/* User Logo and Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={review?.PhotoURL}
                      alt={review.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="ml-3">
                      <p className="text-lg font-medium text-primary">{review.name}</p>
                      <p className="text-sm text-secondary">
                        {timeAgo(review.reviewDateTime)} {/* Use timeAgo function */}
                      </p>
                    </div>
                  </div>
                  {/* Rating */}
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 text-yellow-500">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <p className="ml-2 font-bold text-2xl text-hover">{review.rating}</p>
                  </div>
                </div>
                {/* Review Description */}
                <div className="mt-4">
                  <p className="text-gray-700">{review.review}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;
