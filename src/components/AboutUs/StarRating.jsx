"use client"

import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";

const StarRating = () => {

    const [rating, setRating] = useState(null);
    const [rateColor, setRateColor] = useState(null);

    // console.log(rating);

    return (
        <div className='flex gap-1 items-center'>
            {[...Array(5)].map((star, i) => {
                const currentRate = i + 1;
                return (


                    <label key={i}>

                        <input type="radio" name="rate" value={currentRate} onClick={() => setRating(currentRate)} id="" className='hidden' />

                        <FaStar className='text-2xl' 
                        color={currentRate <= (rateColor || rating) ? '#f2e35e' : '#cfcfcf'} 
                        />


                    </label>


                )
            })}
            <p className='text-2xl ml-2 flex gap-1 items-center'>({rating <= 0 ? '0' : rating} <FaStar className='text-yellow-400' />)</p>
        </div>
    );
};

export default StarRating;