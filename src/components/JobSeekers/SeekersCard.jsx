import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SeekersCard = ({Seekers}) => {

    const {} = Seekers;

    return (
        <div className="bg-sky-50 shadow-2xl mx-2 md:mx-4 p-2 md:p-6 rounded-xl border-l-4 border-sky-600 flex flex-col justify-between hover:border-2 hover:border-sky-500 box-border h-auto">
            <div className="">
                <div>
                    <Image src={logo} alt='Logo' width={300} height={300} className='rounded-xl border-2 border-sky-400 mx-auto'></Image>
                    <h1 className='text-2xl font-semibold animate-pulse text-center mt-2'>{name}</h1>
                </div>

                <div className="text-gray-700 mt-2">
                    <p>
                        <span className="font-bold">Address:</span>{" "}
                        {}
                    </p>
                    <p className='mt-3'>
                        <span className="font-bold">Company Type:</span>{" "}
                        {}
                    </p>

                </div>
                
            </div>
            <div className="flex justify-center mt-4">
                <button className="bg-sky-500 btn hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-lg w-auto">
                    <Link href={`/jobs`}>View Posted Jobs</Link>
                </button>
            </div>
        </div>
    );
};

export default SeekersCard;