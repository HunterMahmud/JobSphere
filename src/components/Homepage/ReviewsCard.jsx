import React from 'react';
import { FaStar } from "react-icons/fa";

const ReviewsCard = ({ reviews }) => {
    const { name, role, rating, review } = reviews;
    return (
        <div className='bg-slate-100 transition hover:shadow-xl dark:bg-sky-50 border-sky-600 max-w-[400px] mx-auto min-h-[330px] dark:shadow-gray-800/25 rounded-lg border-2 py-4 px-6 my-4'>
            <div className='text-center space-y-2'>
                <div className='border-b-2 p-2 border-sky-300 rounded-lg'>
                    <h1 className='text-xl font-bold underline-offset-2 underline'>Name: {name}</h1>
                    <h1 className='text-lg font-semibold'>Position: {role}</h1>
                </div>
                <h1 className='font-semibold flex justify-center items-center gap-2'>Rating: {rating} <FaStar  className='text-lg text-sky-600 ' /></h1>
                
                <h1 className='text-lg font-semibold border-t-2 border-sky-300 rounded-lg'>{review}</h1>
            </div>
        </div>
    );
};

export default ReviewsCard;