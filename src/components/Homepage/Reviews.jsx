"use client";
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Mehedi Hasan',
      image: 'https://via.placeholder.com/50', // Replace with actual image URL
      rating: 5,
      review:
        'ThriveFit Gym offers fantastic nutrition counseling services and their nutritionist has helped me develop a balanced diet that complements my workout routine. The information on the website about these services is good.',
    },
    {
      id: 2,
      name: 'Abu Bakar',
      image: 'https://via.placeholder.com/50', // Replace with actual image URL
      rating: 4,
      review:
        'The commitment to cleanliness and safety at ThriveFit Gym is impressive, especially during these times. The website outlines all their safety protocols, which gave me peace of mind before I even stepped foot in the gym.',
    },
    {
      id: 3,
      name: 'Shamim Ahmed',
      image: 'https://via.placeholder.com/50', // Replace with actual image URL
      rating: 5,
      review:
        'This course and trainer are so good. I am so appreciative of doing this course.',
    },
    {
      id: 4,
      name: 'Shamim Ahmed',
      image: 'https://via.placeholder.com/50', // Replace with actual image URL
      rating: 5,
      review:
        'This course and trainer are so good. I am so appreciative of doing this course.',
    },
  ];

  return (
    <section className=" py-12  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">Reviews</h2>
        <p className="text-center text-gray-900 mt-2 mb-8">What Client Says</p>
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
          className="mySwiper  " // Ensure the Swiper container is positioned relative
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="container flex flex-col w-full max-w-lg  p-6 mx-auto  rounded-lg shadow-lg  bg-accent text-slate-50 min-h-72">
                <div className="flex justify-between p-4">
                  <div className="flex space-x-4">
                    <div>
                      <img src={review.image} alt={review.name} className="object-cover w-12 h-12 rounded-full " />
                    </div>
                    <div>
                      <h4 className="font-bold">{review.name}</h4>
                      <span className="text-xs text-gray-400">2 days ago</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-yellow-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                      <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                    </svg>
                    <span className="text-xl font-bold text-primary">{review.rating}</span>
                  </div>
                </div>
                <div className="p-4 space-y-2 text-sm text-slate-950">
                  <p>{review.review}</p>
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
