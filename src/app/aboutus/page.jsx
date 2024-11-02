
import FAQ from '@/components/shared/FAQ';
import ContactUs from '@/components/AboutUs/ContactUs';
import Image from 'next/image';
import React from 'react';
import OurTeam from '@/components/AboutUs/OurTeam';
import OurMission from '@/components/AboutUs/OurMission';
import Reviews from '@/components/AboutUs/Reviews';
export const metadata = {
    title:  "About Us",
    description: "Learn more about Job Sphere, our mission, core values, and impact in helping connect businesses with top talent. Discover why we prioritize innovation, trust, and user experience.",
    keywords: [
        "Job Sphere",
        "about us",
        "mission",
        "core values",
        "hiring platform",
        "innovation", "trust",
        "user experience",
        "job listings",
        "candidates hired",
        "business partners"],
    openGraph: {
        title: {
            absolute: "About Us"
        },
        description: "Discover the mission, values, and impact of Job Sphere, a platform dedicated to connecting businesses and job seekers.",
        url: `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/aboutus`,
        type: "website"
    }
};

const AboutUsPage = () => {
    return (
        <div className="custom-container">
            <h1 className="lg:text-5xl md:text-4xl text-3xl md:my-8 my-4 font-bold text-center text-gray-800">About Us</h1>
            <OurMission />

            {/* Core Values Section */}
            <div className="md:mt-12 xl:mt-48 md:mb-8 bg-white md:p-10 mt-8 rounded-lg shadow-md">
                <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-center text-gray-800">Core Values</h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="md:p-6 py-4 bg-accent rounded-lg text-center shadow-sm hover:shadow-lg transition-colors">
                        <h3 className="lg:text-3xl md:text-2xl text-xl font-semibold text-primary">Innovation</h3>
                        <p className="mt-4 text-gray-700">We constantly innovate to provide the best tools and features that enhance the hiring process, ensuring seamless communication and efficient workflows.</p>
                    </div>
                    <div className="md:p-6 py-4 bg-accent rounded-lg text-center shadow-sm hover:shadow-lg transition-shadow">
                        <h3 className="lg:text-3xl md:text-2xl text-xl font-semibold text-primary">Trust</h3>
                        <p className="mt-4 text-gray-700">Trust is the foundation of our platform. We are committed to data security, transparency, and delivering on our promises.</p>
                    </div>
                    <div className="md:p-6 py-4 bg-accent rounded-lg text-center shadow-sm hover:shadow-lg transition-shadow">
                        <h3 className="lg:text-3xl md:text-2xl text-xl font-semibold text-primary">User Experience</h3>
                        <p className="mt-4 text-gray-700">We prioritize creating an intuitive, easy-to-use platform that works for businesses and candidates alike.</p>
                    </div>
                </div>
            </div>

            {/* Our team */}
            <OurTeam />

            <div className="md:mt-16 mt-8 bg-white p-10 rounded-lg shadow-md">
                <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-center text-gray-800">Our Impacts</h2>
                <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div>
                        <h3 className="lg:text-3xl md:text-2xl text-xl font-semibold text-primary">10,000+</h3>
                        <p className="text-gray-600">Job Listings</p>
                    </div>
                    <div>
                        <h3 className="lg:text-3xl md:text-2xl text-xl font-semibold text-primary">5,000+</h3>
                        <p className="text-gray-600">Candidates Hired</p>
                    </div>
                    <div>
                        <h3 className="lg:text-3xl md:text-2xl text-xl font-semibold text-primary">500+</h3>
                        <p className="text-gray-600">Businesses Partnered</p>
                    </div>
                </div>
            </div>

            <FAQ />
            <Reviews />

            <div>
                <ContactUs />
            </div>
        </div>
    );
};

export default AboutUsPage;
