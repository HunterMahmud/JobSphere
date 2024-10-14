import Image from 'next/image';
import React from 'react';
import { FaStar } from "react-icons/fa";

const ReviewsCard = ({ reviews }) => {
    const { name, role, rating, image, review, date } = reviews;
    return (
        <div className='bg-slate-100 transition hover:shadow-xl dark:bg-sky-50 border-sky-600 mx-auto dark:shadow-gray-800/25 rounded-lg border-2 py-2 px-4 my-4'>
            <div>
                <div className='flex justify-between'>
                    <div className='p-2  rounded-lg flex gap-2'>
                        <Image src={image} height={50} width={50} className='rounded-full' />
                        <div>
                            <h1 className='text-xl font-bold underline-offset-2 underline'>Name: {name}</h1>
                            <h1 className='text-lg font-semibold'>Position: {role}</h1>
                        </div>
                    </div>
                    <div>
                        <h1 className='font-semibold flex justify-center items-center gap-2 border-2 border-sky-400 h-8 p-2 rounded-full'>Rating: {rating} <FaStar className='text-lg text-yellow-400 ' /></h1>
                        <h1 className='flex justify-center items-center gap-2 h-8 p-2 rounded-full'>Date: {date} </h1>
                    </div>
                </div>

                <h1 className='text-lg py-1 border-t-2 border-sky-300'>{review}</h1>
            </div>
        </div>
    );
};

export default ReviewsCard;