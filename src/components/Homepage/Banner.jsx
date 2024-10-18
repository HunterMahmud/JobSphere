"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";



const Banner = () => {
  const [location, setLocation] = useState("Location");
  const [jobTitle, setJobTitle] = useState('');
  return (
    <div className="relative mb-10">
      <div
        data-aos="fade-up"
        className="absolute  top-[30%] sm:top-[40%] left-12 md:left-20 w-[70%]  z-10"
      >
        <div className=" h-[40%] max-w-[900px] text-white p-5">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl   font-Bebas font-extrabold">
            {" "}
           Discover <br />More than  <span className="text-blue-400">
            5000+ Jobs
            </span>
          </h1>
          <p className="max-w-[500px] mt-5 hidden sm:block"> Achieve peak fitness with expert training, personalized workouts, and a supportive community for all fitness levels. Join us today!</p>
            <div className="flex flex-col md:flex-row items-center p-4 bg-gray-100 rounded-lg shadow-md w-full md:w-4/5 space-y-2 md:space-y-0">
              {/* Job Title Input */}
              <div className="flex items-center bg-white rounded-l-lg border border-gray-300 w-full ">
                <FaSearch className="ml-3 text-gray-400" />
                <input
                  type="text"
                  className="w-full p-2 text-slate-800 border-none focus:outline-none"
                  placeholder="Job title or keyword"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>

              {/* Location Selector */}
              <div className="flex items-center bg-white border-t border-b border-gray-300 w-full ">
                <FaMapMarkerAlt className="ml-3 text-gray-400" />
                <select
                  className="w-full text-slate-800 p-2 border-none focus:outline-none bg-white"
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option disabled value="">Select Location</option>
                  <option value="New York, USA">New York, USA</option>
                  <option value="London, UK">London, UK</option>
                  <option value="Tokyo, Japan">Tokyo, Japan</option>
                </select>
              </div>

              {/* Search Button */}
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-r-lg w-auto md:w-1/2">
                Search job
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
            className={`relative flex items-center justify-left h-[350px] md:h-[500px] lg:h-[600px] object-cover bg-cover bg-[linear-gradient(45deg,rgba(3,7,18,0.5),rgba(3,7,18,0)),url("https://i.ibb.co/smSN6Vw/DALL-E-2024-09-19-17-59-24-A-professional-website-banner-for-a-hiring-agency-and-communication-platf.webp")] bg-center bg-no-repeat`}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={`relative flex items-center justify-left h-[350px] md:h-[500px] lg:h-[600px] object-cover bg-cover bg-[linear-gradient(45deg,rgba(3,7,18,0.5),rgba(3,7,18,0)),url("https://i.ibb.co.com/NpscmFz/man-8442149-640.png")] bg-center bg-no-repeat`}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={`relative flex items-center justify-left h-[350px] md:h-[500px] lg:h-[600px] object-cover bg-cover bg-[linear-gradient(45deg,rgba(3,7,18,0.5),rgba(3,7,18,0)),url("https://i.ibb.co/BjhD3YW/expert-5442081-1280.jpg")] bg-center bg-no-repeat`}
          ></div>
        </SwiperSlide>



      </Swiper>
    </div>
  );
};

export default Banner;
