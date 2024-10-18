import Image from 'next/image';
import React from 'react';
import { FaStar } from "react-icons/fa";

const ReviewsCard = ({ reviews }) => {
    const { name, role, rating, image, review, date } = reviews;
    return (
        <div className='transition hover:shadow-xl border-accent mx-auto dark:shadow-gray-800/25 min-h-[210px] rounded-lg border-2 py-2 px-4 my-4 md:my-0'>
            <div>
                <div className='flex justify-between'>
                    <div className='p-2 rounded-lg flex flex-col md:flex-row gap-2'>
                        <Image src={image} height={50} width={50} alt="Picture" className='rounded-full w-14 h-14 mx-2' />
                        <div>
                            <h1 className='text-xl font-bold underline-offset-2 underline'>Name: {name}</h1>
                            <h1 className='text-lg font-semibold'>Position: {role}</h1>
                            <h1 className=''>Date: {date} </h1>
                        </div>
                    </div>
                        

                </div>

                <h1 className='text-lg py-1 border-t-2 border-accent'>{review}</h1>

                <h1 className='font-semibold flex justify-center items-center gap-2 border-2 border-accent h-8 w-32 p-2 m-2 rounded-full'>Rating: {rating} <FaStar className='text-lg text-yellow-400 ' /></h1>
            </div>
        </div>
    );
};

export default ReviewsCard;