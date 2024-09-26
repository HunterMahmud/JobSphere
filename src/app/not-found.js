'use client'

import Link from "next/link";

const ErrorPage = () => {
    return (
        <div className="flex justify-center flex-col items-center py-10 custom-container">
            <img className="" src={'https://i.imghippo.com/files/sKUHu1715762009.svg'} alt="img" />
            <Link href={'/'} className='px-14 rounded-full py-3 md:py-5 font-medium text-white bg-[#2557a7] hover:bg-[#0d2d5e]'>Back to Home</Link>
        </div>
    );
};

export default ErrorPage;