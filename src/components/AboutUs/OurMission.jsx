import React from 'react';

const OurMission = () => {
    return (
        <div>
            <div className="flex flex-col lg:flex-row px-6 lg:pb-16 py-8 bg-white shadow-md rounded-lg">
                {/* Image Section */}
                <div className="lg:w-1/2 relative">
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
                        className="w-1/2 absolute right-5 lg:top-1/4 top-1/3 rounded-lg border-8 border-white shadow-xl"
                    />
                </div>

                {/* Text Section */}
                <div className="lg:w-1/2 px-4 lg:pb-32 mt-12 md:mt-28 lg:mt-0">
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
        </div>
    );
};

export default OurMission;