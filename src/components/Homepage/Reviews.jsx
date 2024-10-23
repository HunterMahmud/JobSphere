"use client";
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';

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
    {
      id: 5,
      name: 'Shamim Ahmed',
      image: 'https://via.placeholder.com/50', // Replace with actual image URL
      rating: 5,
      review:
        'This course and trainer are so good. I am so appreciative of doing this course.',
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
      id: 6,
      name: 'Shamim Ahmed',
      image: 'https://via.placeholder.com/50', // Replace with actual image URL
      rating: 5,
      review:
        'This course and trainer are so good. I am so appreciative of doing this course.',
    },
    {
      id: 7,
      name: 'Shamim Ahmed',
      image: 'https://via.placeholder.com/50', // Replace with actual image URL
      rating: 5,
      review:
        'This course and trainer are so good. I am so appreciative of doing this course.',
    },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">Reviews</h2>
        <p className="text-center text-gray-600 mt-2 mb-8">What Client Says</p>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
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
          modules={[Pagination]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
                <svg
                  className="w-8 h-8 text-blue-500 mb-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 2.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 10H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-gray-700 mb-4">{review.review}</p>
                <img
                  className="w-12 h-12 rounded-full mb-4"
                  src={review.image}
                  alt={review.name}
                />
                <h4 className="text-lg font-bold text-gray-900">{review.name}</h4>
                <div className="flex justify-center mt-2">
                  {Array(review.rating)
                    .fill()
                    .map((_, index) => (
                      <svg
                        key={index}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.976 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.539 1.118l-3.976-2.89a1 1 0 00-1.176 0l-3.976 2.89c-.783.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.092 9.1c-.783-.57-.38-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.518-4.674z" />
                      </svg>
                    ))}
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
