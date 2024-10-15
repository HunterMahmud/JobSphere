"use client"
import React, { useEffect, useState } from 'react';
import JobCard from '../Jobs/JobCard';
import axios from 'axios';
import Link from 'next/link';

const RecentJobs = () => {
    const [loading, setLoading] = useState(true)
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/api/recentJobs`);
                setJobs(data.recentJobs);
                setLoading(false)

            } catch (error) {
                console.error("Error fetching data: ", error);
                setLoading(false)

            }
        };

        fetchJobs();
    }, []);
    if (loading) {
        return
    }
    // "text-gray-300 hover:text-white"
    return (
        <div>
            <h1 className="text-3xl font-extrabold text-center mb-8">Recent Jobs</h1>
            <div className="grid container grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-11/12 md:w-5/6 lg:w-4/5 mx-auto">
                {
                    jobs?.length > 0 ? jobs.map(job => <JobCard key={job?._id} job={job} />) : <h3 className='text-center mt-5 md:grid-cols-2 lg:col-span-3'>No jobs Found</h3>
                }
            </div>

            <Link 
            className=' my-10 flex justify-center items-center'
            href={"/jobs"} >
                <button className='bg-blue-600  hover:bg-purple-600  py-3 px-6 shadow-2xl text-white font-bold  rounded-md text-sm transition-colors duration-300 ease-in-out'> View All Jobs</button>

            </Link>

        </div>
    );
};

export default RecentJobs;