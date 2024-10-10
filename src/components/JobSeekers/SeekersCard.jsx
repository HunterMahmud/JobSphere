import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SeekersCard = ({seekers}) => {

    const {fullName, profilePicture, city, country, preferredJobPosition, preferredJobType} = seekers.profileOverview;


    return (
        <div className="bg-sky-50 shadow-2xl mx-2 md:mx-4 p-2 md:p-6 rounded-xl border-l-4 border-sky-600 flex flex-col justify-between hover:border-2 hover:border-sky-500 box-border h-auto">
            <div className="">
                <div>
                    <Image src={profilePicture} alt='Profile' width={200} height={150} className='rounded-full w-[150px] h-[150px] border-2 border-sky-400 mx-auto my-4'></Image>
                    <h1 className='text-2xl font-semibold animate-pulse text-center mt-2'>{fullName}</h1>
                </div>

                <div className="text-gray-700 mt-2">
                    <p>
                        <span className="font-bold">Address:</span>{" "}
                        {city}, {country}
                    </p>
                    <p className='mt-3'>
                        <span className="font-bold">Preferred Job Type:</span>{" "}
                        {preferredJobType}
                    </p>
                    <p className='mt-3'>
                        <span className="font-bold">Preferred Position:</span>{" "}
                        {preferredJobPosition}
                    </p>

                </div>
                
            </div>
            <div className="flex justify-center my-6">
                <button className="bg-sky-500 btn hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-lg w-auto">
                    <Link href={`/dashboard/jobSeekers`}>View Details</Link>
                </button>
            </div>
        </div>
    );
};

export default SeekersCard;