import { keys } from '@mui/system';
import React from 'react';
import ReviewsCard from './ReviewsCard';

const Reviews = () => {


    const userReviews = [
        {
            "name": "Emma W.",
            "role": "Software Developer",
            "image": "https://imgbb.host/images/2U9n9.png",
            "rating": 5,
            "review": "JobSphere made my job search so much easier! I was able to filter jobs based on my skills, and I found a perfect fit within a week. The user interface is intuitive, and I love how I can track my applications seamlessly."
          },
          {
            "name": "John D.",
            "role": "Marketing Manager",
            "image": "https://imgbb.host/images/2U9n9.png",
            "rating": 5,
            "review": "I’ve tried a lot of job search platforms, but JobSphere stands out. The tailored recommendations were spot on, and I appreciated the variety of job listings from top companies. The blog section is also a great resource for upgrading my skills."
          },
          {
            "name": "Sophia R.",
            "role": "Data Scientist",
            "image": "https://imgbb.host/images/2U9n9.png",
            "rating": 4,
            "review": "JobSphere’s dynamic search filters helped me land my dream role. The platform's clean design and easy navigation made the entire process smooth. My only suggestion would be to add more insights on the hiring trends."
          },
          {
            "name": "Liam K.",
            "role": "UX Designer",
            "rating": 5,
            "review": "I found the user experience on JobSphere exceptional. As a designer myself, I appreciate how visually appealing and easy to navigate the platform is. I highly recommend it to anyone looking for new job opportunities."
          },
          {
            "name": "John D.",
            "role": "Marketing Manager",
            "image": "https://imgbb.host/images/2U9n9.png",
            "rating": 5,
            "review": "I’ve tried a lot of job search platforms, but JobSphere stands out. The tailored recommendations were spot on, and I appreciated the variety of job listings from top companies. The blog section is also a great resource for upgrading my skills."
          },
          {
            "name": "Olivia M.",
            "role": "Product Manager",
            "image": "https://imgbb.host/images/2U9n9.png",
            "rating": 4,
            "review": "JobSphere offers a great range of job listings from top companies. The platform is quite user-friendly, but I think adding more real-time job alerts would be beneficial for staying updated."
          }
    ]

    const {name, role, rating, review} = userReviews;
    
    return (
        <div className='mx-4 my-10 md:m-16'>
           <h1 className='text-3xl font-bold text-center mb-8 md:mt-20 underline'>Users Reviews</h1>
           {/* Job Cards */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center md:gap-10 mx-auto items-center">
                {Array.isArray(userReviews) && userReviews.length > 0 ? (
                    userReviews.map((reviews, index) => <ReviewsCard key={index} reviews={reviews} />)
                ) : (
                    <p>No Data found</p>
                )}
            </div>
        </div>
    );
};

export default Reviews;