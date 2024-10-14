"use client"

import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";

const StarRating = () => {

    const [rating, setRating] = useState(null);
    const [rateColor, setRateColor] = useState(null);

    // console.log(rating);

    return (
        <div className='flex'>
            {[...Array(5)].map((star, i) => {
                const currentRate = i + 1;
                return (


                    <label key={i}>

                        <input type="radio" name="rate" value={currentRate} onClick={() => setRating(currentRate)} id="" className='hidden' />

                        <FaStar size={50} 
                        color={currentRate <= (rateColor || rating) ? '#f2e35e' : '#cfcfcf'} 
                        />


                    </label>


                )
            })}
        </div>
    );
};

export default StarRating;