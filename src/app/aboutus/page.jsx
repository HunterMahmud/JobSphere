"use client";
import FAQ from '@/components/shared/FAQ';
import ContactUs from '@/components/AboutUs/ContactUs';
import Image from 'next/image';
import React from 'react';
import AddReview from '@/components/AboutUs/AddReview';
import OurTeam from '@/components/AboutUs/OurTeam';
import OurMission from '@/components/AboutUs/OurMission';

const AboutUsPage = () => {
    return (
        <div className="">
                <h1 className='text-4xl my-6 underline font-bold text-center text-gray-800'>About Us</h1>
            <OurMission/>

            {/* Core Values Section */}
            <div className="mt-16 bg-white p-10 rounded-lg shadow-md">
                <h2 className="text-4xl font-bold text-center text-gray-800">Core Values</h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="p-6 bg-accent rounded-lg text-center shadow-sm hover:shadow-lg transition-colors">
                        <h3 className="text-2xl font-semibold text-primary">Innovation</h3>
                        <p className="mt-4 text-gray-700">We constantly innovate to provide the best tools and features that enhance the hiring process, ensuring seamless communication and efficient workflows.</p>
                    </div>
                    <div className="p-6 bg-accent rounded-lg text-center shadow-sm hover:shadow-lg transition-shadow">
                        <h3 className="text-2xl font-semibold text-primary">Trust</h3>
                        <p className="mt-4 text-gray-700">Trust is the foundation of our platform. We are committed to data security, transparency, and delivering on our promises.</p>
                    </div>
                    <div className="p-6 bg-accent rounded-lg text-center shadow-sm hover:shadow-lg transition-shadow">
                        <h3 className="text-2xl font-semibold text-primary">User Experience</h3>
                        <p className="mt-4 text-gray-700">We prioritize creating an intuitive, easy-to-use platform that works for businesses and candidates alike.</p>
                    </div>
                </div>
            </div>


            {/* Our team */}
            <OurTeam />

            <div className="mt-16 bg-white p-10 rounded-lg shadow-md">
                <h2 className="text-4xl font-bold text-center text-gray-800">Our Impact</h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                    <div>
                        <h3 className="text-4xl font-semibold text-primary">10,000+</h3>
                        <p className="text-gray-600 mt-2">Job Listings</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-semibold text-primary">5,000+</h3>
                        <p className="text-gray-600 mt-2">Candidates Hired</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-semibold text-primary">500+</h3>
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
