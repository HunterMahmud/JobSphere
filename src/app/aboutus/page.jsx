"use client";
import FAQ from '@/components/shared/FAQ';
import ContactUs from '@/components/shared/ContactUs';
import Image from 'next/image';
import React from 'react';
import AddReview from '@/components/shared/AddReview';

const AboutUsPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-10">

            

            {/* Hero Section */}
            <div className="hero-content flex flex-col md:flex-row p-10 bg-white shadow-md rounded-lg">
                {/* Image Section */}
                <div className="lg:w-1/2 relative ">
                    {/* First Image */}
                    <Image
                        src="/images/img2.jpg"
                        alt="Our Mission"
                        width={600}
                        height={400}
                        className="w-3/4 rounded-lg shadow-xl"
                    />
                    {/* Second Image */}
                    <Image
                        src="/images/img1.jpg"
                        alt="Our Vision"
                        width={600}
                        height={400}
                        className="w-1/2 absolute right-5 top-1/3 rounded-lg border-8 border-white shadow-xl"
                    />
                </div>

                {/* Text Section */}
                <div className="lg:w-1/2 space-y-5 p-4 pt-14">
                    <h2 className="lg:text-5xl text-2xl text-black lg:text-left font-bold pt-5">
                        Our Mission <span className="text-indigo-600">and Vision</span>
                    </h2>
                    <p className="py-6 text-lg text-gray-700 leading-relaxed">
                        JobSphere is a next-generation hiring and communication platform designed to streamline the recruitment process for both businesses and job seekers. We aim to bridge the gap between companies and potential candidates by offering an intuitive, real-time system for job postings, applications, and communication.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Whether you are a business looking to hire the best talent or a job seeker aiming for your dream job, JobSphere simplifies the process with real-time messaging, application tracking, and personalized job alerts. Built on cutting-edge technology like Next.js, our platform offers scalability and efficiency, ensuring the best experience.
                    </p>
                </div>
            </div>

            {/* Core Values Section */}
            <div className="mt-16 bg-white p-10 rounded-lg shadow-md">
                <h2 className="text-4xl font-bold text-center text-gray-800">Core Values</h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="p-6 bg-[#D6E5E3] rounded-lg text-center shadow-sm hover:shadow-lg transition-colors">
                        <h3 className="text-2xl font-semibold text-indigo-600">Innovation</h3>
                        <p className="mt-4 text-gray-700">We constantly innovate to provide the best tools and features that enhance the hiring process, ensuring seamless communication and efficient workflows.</p>
                    </div>
                    <div className="p-6 bg-[#D6E5E3] rounded-lg text-center shadow-sm hover:shadow-lg transition-shadow">
                        <h3 className="text-2xl font-semibold text-indigo-600">Trust</h3>
                        <p className="mt-4 text-gray-700">Trust is the foundation of our platform. We are committed to data security, transparency, and delivering on our promises.</p>
                    </div>
                    <div className="p-6 bg-[#D6E5E3] rounded-lg text-center shadow-sm hover:shadow-lg transition-shadow">
                        <h3 className="text-2xl font-semibold text-indigo-600">User Experience</h3>
                        <p className="mt-4 text-gray-700">We prioritize creating an intuitive, easy-to-use platform that works for businesses and candidates alike.</p>
                    </div>
                </div>
            </div>


            <div className="mt-16 bg-white p-10 rounded-lg shadow-md">
                <h2 className="text-4xl font-bold text-center text-gray-800">Our Team</h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                    <div className="text-center">
                        <Image
                            src={"https://i.ibb.co.com/WFk4dJ0/Tanvir.jpg"}
                            width={600}
                            height={400}
                            alt="Tanvir Ahamed"
                            className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg" />
                        <h3 className="text-2xl font-semibold">Tanvir Ahamed</h3>
                        <p className="text-gray-600">Design & Analysis</p>
                        <a href="https://linkedin.com" className="text-indigo-600 mt-2 block">LinkedIn</a>
                    </div>

                    <div className="text-center">
                        <Image
                            src={"https://i.ibb.co.com/54M49Z0/Hasan.jpg"}
                            width={600}
                            height={400}
                            alt="Hasan Al Mahmud"
                            className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg" />
                        <h3 className="text-2xl font-semibold">Hasan Al Mahmud</h3>
                        <p className="text-gray-600">Backend Developer</p>
                        <a href="https://linkedin.com" className="text-indigo-600 mt-2 block">LinkedIn</a>
                    </div>

                    <div className="text-center">
                        <Image
                            src={"https://i.ibb.co.com/FH7Yhb6/Rafizul.jpg"}
                            alt="Rafizul Islam"
                            width={600}
                            height={400}
                            className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg" />
                        <h3 className="text-2xl font-semibold">Rafizul Islam</h3>
                        <p className="text-gray-600">Frontend Developer</p>
                        <a href="https://linkedin.com" className="text-indigo-600 mt-2 block">LinkedIn</a>
                    </div>


                </div>

                <div className="mt-8 mx-32 grid grid-cols-1 md:grid-cols-2 justify-around">
                    <div className="text-center">
                        <Image
                            src={"https://i.ibb.co.com/gz7jjtF/Shamim.jpg"}
                            alt="Md Shamim"
                            width={600}
                            height={400}
                            className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg" />
                        <h3 className="text-2xl font-semibold">Md Shamim</h3>
                        <p className="text-gray-600">Backend Developer</p>
                        <a href="https://linkedin.com" className="text-indigo-600 mt-2 block">LinkedIn</a>
                    </div>

                    <div className="text-center">
                        <Image
                            src={"https://i.ibb.co.com/Ct6mM6L/Sahidul.jpg"}
                            alt="MD Sahidul Islam"
                            width={600}
                            height={400}
                            className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg" />

                        <h3 className="text-2xl font-semibold">MD Sahidul Islam</h3>
                        <p className="text-gray-600">Frontend Developer</p>
                        <a href="https://linkedin.com" className="text-indigo-600 mt-2 block">LinkedIn</a>
                    </div>

                </div>
            </div>

            <div className="mt-16 bg-white p-10 rounded-lg shadow-md">
                <h2 className="text-4xl font-bold text-center text-gray-800">Our Impact</h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                    <div>
                        <h3 className="text-4xl font-semibold text-indigo-600">10,000+</h3>
                        <p className="text-gray-600 mt-2">Job Listings</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-semibold text-indigo-600">5,000+</h3>
                        <p className="text-gray-600 mt-2">Candidates Hired</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-semibold text-indigo-600">500+</h3>
                        <p className="text-gray-600 mt-2">Businesses Partnered</p>
                    </div>
                </div>
            </div>

            <FAQ></FAQ>
            <AddReview></AddReview>

            <div className="mt-16 bg-white p-10 rounded-lg shadow-md">
                <ContactUs />
            </div>
        </div>
    );
};

export default AboutUsPage;
