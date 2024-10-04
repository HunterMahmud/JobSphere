"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';

const Companies = () => {
    const [companiesName, setCompaniesName] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/api/companiesName`);
                setCompaniesName(data.companiesName);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data: ", error);
                setLoading(false)

            }
        };

        fetchJobs();
    }, []);

    console.log(companiesName)
    return (
        <div className="container mx-auto my-12">
            <h1 className="text-3xl font-extrabold text-center mb-8">Connected Companies</h1>

            <Marquee>
                <div className='grid grid-rows-3 grid-flow-col gap-4'>
                    {
                        companiesName.map(Name => <div className='min-w-72' key={Name._id}><h1 className='bg-blue-100 px-2 ml-5 py-3 rounded-2xl border-2 border-blue-800 text-center text-xl font-semibold text-slate-800 ' >{Name?.companyDetails?.companyName}</h1></div>)
                    }  </div>
            </Marquee>
        </div>

    );
};

export default Companies;