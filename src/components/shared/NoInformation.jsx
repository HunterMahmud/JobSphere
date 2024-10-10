import Image from 'next/image';
import React from 'react';

const NoInformation = ({ edit, setEdit }) => {
    return (
        <div className='relative'>
            <Image src={'https://i.ibb.co.com/FqhVFG4/loading-files.gif'} alt='No Information' width={500} height={500} />
            <div className='absolute flex justify-center items-center w-full top-[70%]'>
                <button onClick={() => setEdit(!edit)} className='  bg-primary text-white px-5 py-3 rounded-lg'>Add Information</button>
            </div>
        </div>
    );
};

export default NoInformation;