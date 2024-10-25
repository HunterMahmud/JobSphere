"use client"
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
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
    return (
        <div className="container mx-auto my-12">
            <h1 className="text-3xl font-extrabold text-center mb-8">Connected Companies</h1>

            <Marquee>
                <div className="flex justify-center space-x-8">
                    {
                        companiesName?.map(Name => <Link href={`/companies/${Name._id}`} key={Name._id} className="group flex flex-col justify-between  items-center transition-transform duration-300 hover:scale-110 rounded-lg my-4 mx-2">
                                <Image
                                    src={Name?.companyInfo?.logo}
                                    alt={Name?.companyInfo?.companyName}
                                    width={100}
                                    height={100}
                                    className="rounded-lg"
                                />
                                <p className='text-xs text-primary '>{Name?.companyInfo?.companyName}</p>
                        </Link>)
                    }
                </div>


            </Marquee>
        </div>

    );
};

export default Companies;