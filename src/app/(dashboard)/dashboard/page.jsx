"use client"
import React, { useEffect, useState } from 'react';
import { FaUserSecret, FaUser, FaBriefcase } from 'react-icons/fa';
import CountUp from 'react-countup';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Loader from '@/app/loading';

const DashboardPage = () => {
    const [loading ,setLoading]=useState(true)
    const [information , setInformation]=useState()
    const seasons = useSession()
    
    useEffect(() => {
        const fetchJobs = async () => {
          setLoading(true);
          try {
            const { data } = await axios.get(
              `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/api/dashBoardOverview`
            );
            setInformation(data);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching data: ", error);
            setLoading(false);
          }
        };
        fetchJobs(); // Fetch jobs when page or search changes
      }, []);
    if (loading) {
      return <Loader/>  
    }
    return (
        <div>
            <div className='text-center w-full'>
                <h1 className=" text-center py-10 bg-gradient-to-r from-[#007ACC] via-[#0f7fca] to-[#3C4757] bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl" >
                    Welcome Back ,<span className='bg-opacity-90'>{seasons?.data?.user?.name}..</span>
                    <span className="block sm: text-xl lg:text-3xl mt-6"> Find Job, Build Dreams </span>
                </h1>
            </div>
            <div className='mx-10 flex flex-col lg:flex-row gap-10 '>
                
                {/* Total Users Card */}
                <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 w-full flex justify-start">
                    <div className="flex justify-center items-center gap-5 ">
                        <div className="grid size-20 place-content-center rounded-full border-2 border-indigo-500">
                            <div className="flex items-center gap-1">
                                <FaUserSecret className='text-3xl text-[#007ACC] font-bold' />
                            </div>
                        </div>
                        <div>
                            <strong className="rounded border border-indigo-500 bg-[#3C4757] px-3 py-1.5 text-[10px] font-medium text-white">
                                Feature #101
                            </strong>

                            <h3 className="mt-4 text-lg font-medium sm:text-xl">
                                Total Users
                            </h3>
                            <h1 className='text-2xl font-extrabold text-gray-900 ml-2'>
                                <CountUp start={0} end={information?.totalUsers} duration={2} suffix='+'  />
                            </h1>
                        </div>
                    </div>
                </article>

                {/* Total Jobs Card */}
                <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 w-full flex justify-start">
                    <div className="flex justify-center items-center gap-5 ">
                        <div className="grid size-20 place-content-center rounded-full border-2 border-indigo-500">
                            <div className="flex items-center gap-1">
                                <FaBriefcase  className='text-4xl text-[#007ACC] font-bold' />
                            </div>
                        </div>
                        <div>
                            <strong className="rounded border border-indigo-500 bg-[#3C4757] px-3 py-1.5 text-[10px] font-medium text-white">
                                Feature #102
                            </strong>

                            <h3 className="mt-4 text-lg font-medium sm:text-xl">
                                Total Jobs
                            </h3>
                            <h1 className='text-2xl font-extrabold text-gray-900'>
                                <CountUp start={0} end={information?.totalJobs} duration={2} suffix='+' />
                            </h1>
                        </div>
                    </div>
                </article>

                {/* Total Funds Card */}
                <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 w-full flex justify-start">
                    <div className="flex justify-center items-center gap-5 ">
                        <div className="grid size-20 place-content-center rounded-full border-2 border-indigo-500">
                            <div className="flex items-center gap-1">
                                <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
                                <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
                                <span className="h-4 w-0.5 rounded-full bg-indigo-500"></span>
                                <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
                                <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
                            </div>
                        </div>
                        <div>
                            <strong className="rounded border border-indigo-500 bg-[#3C4757] px-3 py-1.5 text-[10px] font-medium text-white">
                                Feature #103
                            </strong>

                            <h3 className="mt-4 text-lg font-medium sm:text-xl">
                                Companies
                            </h3>
                            <h1 className='text-2xl font-extrabold text-gray-900'>
                                <CountUp start={0} end={information?.totalCompanies} duration={2} suffix='+' />
                            </h1>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default DashboardPage;
