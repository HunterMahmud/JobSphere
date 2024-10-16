"use client"
import React from 'react';
import { FaUserSecret, FaUser } from 'react-icons/fa';
import CountUp from 'react-countup';

const DashboardPage = () => {
    return (
        <div>
            <div className='text-center w-full'>
                <h1 className=" text-center py-10 bg-gradient-to-r from-[#007ACC] via-[#0f7fca] to-[#3C4757] bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl" >
                    Welcome Back ,<span className='bg-opacity-90'>Sahidul islam..</span>
                    <span className="block sm: text-xl lg:text-3xl mt-6"> Find Work, Build Dreams </span>
                </h1>
            </div>
            <div className='mx-10 flex flex-col lg:flex-row gap-10 '>
                
                {/* Total Users Card */}
                <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 w-full flex justify-start">
                    <div className="flex justify-center items-center gap-5 ">
                        <div className="grid size-20 place-content-center rounded-full border-2 border-indigo-500">
                            <div className="flex items-center gap-1">
                                <FaUserSecret className='text-3xl text-lime-500 font-bold' />
                            </div>
                        </div>
                        <div>
                            <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
                                Episode #101
                            </strong>

                            <h3 className="mt-4 text-lg font-medium sm:text-xl">
                                Total Users
                            </h3>
                            <h1 className='text-2xl font-extrabold text-gray-900 ml-2'>
                                <CountUp start={0} end={100} duration={3} suffix='+'  />
                            </h1>
                        </div>
                    </div>
                </article>

                {/* Total Jobs Card */}
                <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 w-full flex justify-start">
                    <div className="flex justify-center items-center gap-5 ">
                        <div className="grid size-20 place-content-center rounded-full border-2 border-indigo-500">
                            <div className="flex items-center gap-1">
                                <FaUser className='text-4xl text-red-700 font-bold' />
                            </div>
                        </div>
                        <div>
                            <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
                                Episode #102
                            </strong>

                            <h3 className="mt-4 text-lg font-medium sm:text-xl">
                                Total Jobs
                            </h3>
                            <h1 className='text-2xl font-extrabold text-gray-900'>
                                <CountUp start={0} end={800} duration={3} suffix='+' />
                            </h1>
                        </div>
                    </div>
                </article>

                {/* Total Funds Card */}
                <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 w-full flex justify-start">
                    <div className="flex justify-center items-center gap-5 ">
                        <div className="grid size-20 mr-5 place-content-center rounded-full border-2 border-indigo-500">
                            <div className="flex items-center gap-1">
                                <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
                                <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
                                <span className="h-4 w-0.5 rounded-full bg-indigo-500"></span>
                                <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
                                <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
                            </div>
                        </div>
                        <div>
                            <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
                                Episode #103
                            </strong>

                            <h3 className="mt-4 text-lg font-medium sm:text-xl">
                                Total Funds
                            </h3>
                            <h1 className='text-2xl font-extrabold text-gray-900'>
                                <CountUp start={0} end={100} duration={3} suffix='+' />
                            </h1>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default DashboardPage;
