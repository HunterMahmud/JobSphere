"use client";
import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const Banner = () => (
  <>
    <div className='mx-1'>
      <AwesomeSlider className="h-[400px] md:h-[550px] w-full my-10">
        <div className='h-full w-full'>
          <img className='h-full w-full object-cover' src="https://i.ibb.co/smSN6Vw/DALL-E-2024-09-19-17-59-24-A-professional-website-banner-for-a-hiring-agency-and-communication-platf.webp" alt="Professional website banner" />
        </div>
        <div className='h-full w-full'>
          <img className='h-full w-full object-cover' src="https://i.ibb.co/k4VPPfL/job-3279118.jpg" alt="Hiring agency image" />
        </div>
        <div className='h-full w-full'>
          <img className='h-full w-full object-cover' src="https://i.ibb.co/BjhD3YW/expert-5442081-1280.jpg" alt="Expert consultancy" />
        </div>
      </AwesomeSlider>
    </div>
  </>
);

export default Banner;
