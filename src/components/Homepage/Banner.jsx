"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Link from "next/link";

const Banner = () => {
  
  return (
    <div className="relative mb-10 ">
      <div
        className="absolute top-[20%] md:top-[30%] left-12 right-12 md:left-20 z-10"
      >
        <div className="md:h-[40%] pl-6 max-w-[900px] text-white bg-black bg-opacity-30 rounded-lg p-2">
          <h1 className="text-lg sm:text-xl lg:text-4xl font-Bebas font-extrabold">
            {" "}
            Discover <br />
            More than <span className="text-secondary">5000+ Jobs</span>
          </h1>
          <p className="max-w-[500px] mt-5 hidden sm:block">
            {" "}
            Empowering Careers, Elevating Hiring – Where Talent Meets Opportunity.
          </p>

          <div className="flex mx-auto mt-4">
            <button className="bg-primary btn hover:bg-hover text-white font-semibold py-2 my-3 px-4 rounded-lg w-auto">
              <Link href={`/jobs`}>View Jobs</Link>
            </button>
          </div>
                   
          
        </div>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className={`relative flex items-center justify-left h-[350px] md:h-[500px] lg:h-[600px] object-cover bg-cover bg-[linear-gradient(45deg,rgba(3,7,18,0.5),rgba(3,7,18,0)),url("https://i.ibb.co.com/JkwYFyf/Banner1.jpg")] bg-center bg-no-repeat`}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={`relative flex items-center justify-left h-[350px] md:h-[500px] lg:h-[600px] object-cover bg-cover bg-[linear-gradient(45deg,rgba(3,7,18,0.5),rgba(3,7,18,0)),url("https://i.ibb.co.com/f2ttnRh/Banner2.jpg")] bg-center bg-no-repeat`}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={`relative flex items-center justify-left h-[350px] md:h-[500px] lg:h-[600px] object-cover bg-cover bg-[linear-gradient(45deg,rgba(3,7,18,0.5),rgba(3,7,18,0)),url("https://i.ibb.co.com/vVFx23Q/Banner3.jpg")] bg-center bg-no-repeat`}
          ></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
