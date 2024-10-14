import { keys } from '@mui/system';
import React from 'react';
import ReviewsCard from './ReviewsCard';
import Link from 'next/link';

const Reviews = () => {


  const userReviews = [
    {
      "name": "Emma W.",
      "role": "Software Developer",
      "date" : "12.10.2024",
      "image": "https://i.ibb.co.com/54M49Z0/Hasan.jpg",
      "rating": 5,
      "review": "JobSphere made my job search so much easier! I was able to filter jobs based on my skills, and I found a perfect fit within a week. The user interface is intuitive, and I love how I can track my applications seamlessly."
    },
    {
      "name": "John D.",
      "role": "Marketing Manager",
      "date" : "12.10.2024",
      "image": "https://i.ibb.co.com/WFk4dJ0/Tanvir.jpg",
      "rating": 5,
      "review": "I’ve tried a lot of job search platforms, but JobSphere stands out. The tailored recommendations were spot on, and I appreciated the variety of job listings from top companies. The blog section is also a great resource for upgrading my skills."
    },
    {
      "name": "Sophia R.",
      "role": "Data Scientist",
      "date" : "12.10.2024",
      "image": "https://i.ibb.co.com/Ct6mM6L/Sahidul.jpg",
      "rating": 4,
      "review": "JobSphere’s dynamic search filters helped me land my dream role. The platform's clean design and easy navigation made the entire process smooth. My only suggestion would be to add more insights on the hiring trends."
    },
  ]

  const { name, role, rating, review } = userReviews;

  return (
    <div className='mx-4 my-2'>
      <h1 className='text-3xl font-bold text-center mb-2'>Users Reviews</h1>
      {/* Job Cards */}
      <div className="flex flex-col justify-center mx-auto items-center">
        {Array.isArray(userReviews) && userReviews.length > 0 ? (
          userReviews.map((reviews, index) => <ReviewsCard key={index} reviews={reviews} />)
        ) : (
          <p>No Data found</p>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <button className="bg-sky-500 btn hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-lg w-auto">
          <Link href={`/usersReview`}>View All Reviews</Link>
        </button>
      </div>
    </div>
  );
};

export default Reviews;