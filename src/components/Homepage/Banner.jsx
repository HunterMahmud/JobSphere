"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Link from "next/link";

const Banner = () => {
  const [location, setLocation] = useState("Location");
  const [jobTitle, setJobTitle] = useState("");
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
                   
          {/* <div className="flex flex-col md:flex-row items-center py-4 rounded-lg shadow-md w-full md:w-4/5 space-y-2 md:space-y-0">  */}
          {/* Job Title Input  */}
          {/* <div className="flex items-center bg-white rounded-l-lg border border-gray-300 w-full ">
              <FaSearch className="ml-3 text-gray-400" />
              <input
                type="text"
                className="w-full p-2 text-slate-800 border-none focus:outline-none"
                placeholder="Job title or keyword"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>  */}

          {/* Location Selector  */}
          {/* <div className="flex items-center bg-white border-t border-b border-gray-300 w-full ">
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
            </div>  */}

          {/* Search Button  */}
          {/* <button className="bg-primary hover:bg-hover text-white font-semibold py-2 px-6 rounded-r-lg w-auto md:w-1/2">
              Search
            </button> 
          </div>  */}
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
