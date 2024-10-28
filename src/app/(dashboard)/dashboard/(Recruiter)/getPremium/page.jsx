import React from 'react';
import { FcOk } from "react-icons/fc";

const getPremium = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-8">Get Premium</h1>

            <div className='space-y-4 flex flex-col md:flex-row md:justify-around'>
                <div className="border max-w-[350px] min-h-[400px] px-4 py-6 bg-[url('https://i.ibb.co/hch8Kbm/ix-GTl1715763309.png')] rounded-md shadow-md hover:shadow-xl hover:scale-[1.01] transition-all space-y-2 text-black">
                    <h3 className='text-xl font-semibold text-center my-3'>Get Premium for 1 month</h3>

                    <div className='space-y-3'>
                        <p className='text-lg flex items-center gap-2'><span><FcOk /></span>10 Jobs Post in 1 Month</p>
                        <p className='text-lg flex items-center gap-2'><span><FcOk /></span>Unlimited Blogs in 1 Month</p>
                        <p className='text-lg flex items-center gap-2'><span><FcOk /></span>50 Interview in 1 Month</p>
                        <p className='text-lg flex items-center gap-2'><span><FcOk /></span>Priority Listing for Job Posts for 1 Month</p>
                        <p className='text-lg flex items-center gap-2'><span><FcOk /></span>Priority Listing for Companies for 1 Month</p>
                    </div>
                    <div>
                        <button
                            // onClick={handleApplyNow}
                            className="bg-primary flex justify-center mx-auto text-sm md:text-base text-white px-4 md:px-6 py-2 rounded-lg hover:bg-hover transition"
                        >
                            Buy 1 Month Premium
                        </button>
                    </div>
                </div>

                {/* For 1 Year */}
                <div className="border max-w-[350px] min-h-[400px] px-4 py-6 bg-[url('https://i.ibb.co/hch8Kbm/ix-GTl1715763309.png')] rounded-md shadow-md hover:shadow-xl hover:scale-[1.01] transition-all space-y-2 text-black">
                    <h3 className='text-xl font-semibold text-center my-3'>Get Premium for 1 Year</h3>
                    <div className='space-y-3'>
                        <p className='text-lg flex items-center gap-2'><span><FcOk /></span>Unlimited Jobs Post in 1 Year</p>
                        <p className='text-lg flex items-center gap-2'><span><FcOk /></span>Unlimited Blogs in 1 Year</p>
                        <p className='text-lg flex items-center gap-2'><span><FcOk /></span>Unlimited Interview in 1 Year</p>
                        <p className='text-lg flex items-center gap-2'><span><FcOk /></span>Priority Listing for Job Posts for 1 Year</p>
                        <p className='text-lg flex items-center gap-2'><span><FcOk /></span>Priority Listing for Companies for 1 Year</p>
                    </div>
                    <button
                        // onClick={handleApplyNow}
                        className="bg-primary flex justify-center mx-auto text-sm md:text-base text-white px-4 md:px-6 py-2 rounded-lg hover:bg-hover transition"
                    >
                        Buy 1 Year Premium
                    </button>
                </div>
            </div>
        </div>
    );
};

export default getPremium;