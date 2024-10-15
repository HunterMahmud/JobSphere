import ReviewsCard from '@/components/AboutUs/ReviewsCard';
import React from 'react';

const usersReview = () => {

    const userReviews = [
        {
            "name": "Hasan Al Mahmud",
            "role": "Software Developer",
            "image": "https://i.ibb.co.com/54M49Z0/Hasan.jpg",
            "rating": 5,
            "date" : "10 October 2024",
            "review": "JobSphere made my job search so much easier! I was able to filter jobs based on my skills, and I found a perfect fit within a week. The user interface is intuitive, and I love how I can track my applications seamlessly."
        },
        {
            "name": "Tanvir Ahamed",
            "role": "Marketing Manager",
            "image": "https://i.ibb.co.com/WFk4dJ0/Tanvir.jpg",
            "rating": 5,
            "date" : "10 October 2024",
            "review": "I’ve tried a lot of job search platforms, but JobSphere stands out. The tailored recommendations were spot on, and I appreciated the variety of job listings from top companies. The blog section is also a great resource for upgrading my skills."
        },
        {
            "name": "Rafizul Islam.",
            "role": "Data Scientist",
            "image": "https://i.ibb.co.com/FH7Yhb6/Rafizul.jpg",
            "rating": 4,
            "date" : "11 October 2024",
            "review": "JobSphere’s dynamic search filters helped me land my dream role. The platform's clean design and easy navigation made the entire process smooth. My only suggestion would be to add more insights on the hiring trends."
        },
        {
            "name": "Shohidul Islam",
            "role": "UX Designer",
            "image": "https://i.ibb.co.com/Ct6mM6L/Sahidul.jpg",
            "rating": 5,
            "date" : "11 October 2024",
            "review": "I found the user experience on JobSphere exceptional. As a designer myself, I appreciate how visually appealing and easy to navigate the platform is. I highly recommend it to anyone looking for new job opportunities."
        },
        {
            "name": "Shamim Hossain",
            "role": "Marketing Manager",
            "image": "https://i.ibb.co.com/gz7jjtF/Shamim.jpg",
            "rating": 5,
            "date" : "12 October 2024",
            "review": "I’ve tried a lot of job search platforms, but JobSphere stands out. The tailored recommendations were spot on, and I appreciated the variety of job listings from top companies. The blog section is also a great resource for upgrading my skills."
        },
        {
            "name": "Tanvir Jubayer",
            "role": "Product Manager",
            "image": "https://i.ibb.co.com/WFk4dJ0/Tanvir.jpg",
            "rating": 4,
            "date" : "12 October 2024",
            "review": "JobSphere offers a great range of job listings from top companies. The platform is quite user-friendly, but I think adding more real-time job alerts would be beneficial for staying updated."
        }
    ]

    return (
        <div className='md:mx-6 mx-2'>
            <h1 className="text-3xl font-bold text-center my-8 underline underline-offset-2">Users Reviews</h1>
            {/* Reviews Cards */}
            <div className="grid md:grid-cols-2 space-x-6 justify-center mx-auto items-center">
                {Array.isArray(userReviews) && userReviews.length > 0 ? (
                    userReviews.map((reviews, index) => <ReviewsCard key={index} reviews={reviews} />)
                ) : (
                    <p>No Data found</p>
                )}
            </div>
        </div>
    );
};

export default usersReview;