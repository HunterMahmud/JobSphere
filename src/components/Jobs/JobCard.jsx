'use client'
import { AiOutlineDollarCircle, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBookmark, FaClock, FaRegBookmark } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { PiBagSimpleFill } from 'react-icons/pi';
import { FaLocationDot } from 'react-icons/fa6';
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";

export const getPostedTimeAgo = (date) => {
    if (!date || isNaN(new Date(date).getTime())) {
        return "Invalid date";  // Return a fallback or default value
    }
    return formatDistanceToNow(new Date(date), { addSuffix: true });
};


const JobCard = ({ job }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [save, setSave] = useState(false);
    const { data } = useSession();
    const { _id, jobTitle, jobType, postedDate, salaryScale, applicantsNumber, compnayInforamtion, saveUsers } = job;
    const email = data?.user?.email

    useEffect(() => {
        if (Array.isArray(saveUsers) && saveUsers.includes(email)) {
            setSave(true);
        }
    }, [job, email]);

    const handleSave = async () => {
        const saveInfo = [
            ...saveUsers || [],
            email
        ]

        const newJob = { user: data?.user, job: { ...job, saveUsers: saveInfo } };

        if (!email) {
            return toast('Please Login or Register first!', {
                icon: '🔐',
            });
        }

        try {
            setIsLoading(true)
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/api/saveJob`,
                newJob
            );
            if (data?.result?.acknowledged) {
                setSave(!save)
                await axios.put(
                    `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/myPostedJobs/api/postedJobs/${_id}`,
                    { saveUsers: saveInfo }
                );
                setIsLoading(false);
                toast.success("Save Successfully");
            }
        } catch (err) {
            if (err.response.status === 409) {
                setIsLoading(false);
                toast('You have already save this job!', {
                    icon: '🫵',
                });
            } else {
                setIsLoading(false);
                toast.error(err?.message);
            }
        }
    }

    return (
        <div className="border w-full px-3 py-4 bg-[url('https://i.ibb.co/hch8Kbm/ix-GTl1715763309.png')] rounded-md shadow-md hover:shadow-xl hover:scale-[1.01] transition-all space-y-2 text-black">
            <div className='flex justify-between'>

                <div className='flex gap-3'>
                    <div className="">
                        <Image className='border rounded-full' alt={compnayInforamtion?.companyInfo?.companyName || 'Company Logo'} src={compnayInforamtion?.companyInfo?.logo} width={60} height={50} />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <h1 className='text-xl font-semibold '>
                            {jobTitle?.slice(0, 20)}{jobTitle?.length > 20 && '...'}
                        </h1>
                        <p className='text-start'>
                            {compnayInforamtion?.companyInfo?.companyName?.slice(0, 30)}{compnayInforamtion?.companyInfo?.companyName?.length > 20 && '...'}
                        </p>
                    </div>
                </div>

                <button disabled={isLoading} onClick={handleSave} className={`${isLoading && 'cursor-not-allowed'} text-[22px] cursor-pointer mb-4`}>
                    {
                        isLoading ? <AiOutlineLoading3Quarters className="animate-spin m-auto" /> :
                            save ?
                                <FaBookmark /> :
                                <FaRegBookmark />
                    }
                </button>
            </div>

            <div className='flex items-center gap-1'>
                <span><AiOutlineDollarCircle /></span>
                {salaryScale}
            </div>

            <div className='flex justify-between'>
                <div className="flex justify-betwee gap-2 items-center">
                    <span className="font-medium text-gray-600"><PiBagSimpleFill /></span>
                    <span className="text-gray-800">{jobType}</span>
                </div>

                <div className="flex justify-betwee gap-2 items-center">
                    <span className="font-medium text-gray-600"><FaLocationDot /></span>
                    <span className="text-gray-800">{job?.locationType}</span>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <p >
                    Applicants: {applicantsNumber}
                </p>

                <div className="flex items-center">
                    {/* Clock Icon */}
                    <FaClock className="text-gray-500 mr-2" />
                    {/* Time ago text */}
                    <span className="text-sm text-gray-800">{getPostedTimeAgo(postedDate)}</span>
                </div>
            </div>

            <Link href={`/jobs/${_id}`}>
                <button className="btn border-0 py-2 rounded-md w-full bg-primary hover:bg-hover text-white mt-4 rounded-ful">View Details</button>
            </Link>
        </div>
    )
}

export default JobCard;