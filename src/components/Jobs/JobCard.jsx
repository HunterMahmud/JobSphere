'use client'
import { AiOutlineDollarCircle, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBookmark, FaClock, FaRegBookmark } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { PiBagSimpleFill } from 'react-icons/pi';
import { FaLocationDot } from 'react-icons/fa6';
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";

export const getPostedTimeAgo = (postedDate) => {
    return formatDistanceToNow(new Date(postedDate), { addSuffix: true });
};

const JobCard = ({ job }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [save, setSave] = useState(false);
    const { data } = useSession();
    const { _id, jobTitle, jobType, postedDate, salaryScale, applicantsNumber, compnayInforamtion } = job
    console.log(data?.user)
    const handleSave = async () => {
        const newJob = { user: data?.user, job };

        if (!data?.user?.email) {
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
                toast.success("Save Successfully");
                setIsLoading(false);
            }
        } catch (err) {
            if (err.response.status === 409) {
                setIsLoading(false);
                toast.error("You have already save this job!");
            } else {
                setIsLoading(false);
                toast.error(err?.message);
            }
        }
    }

    return (
        <div className="border w-full max-w-sm px-3 py-4 bg-[url('https://i.ibb.co/hch8Kbm/ix-GTl1715763309.png')] rounded-md shadow-md hover:shadow-xl hover:scale-[1.01] transition-all space-y-2 text-black">
            <div className='flex justify-between'>

                <div className='flex gap-3'>
                    <div className="">
                        <Image className='border rounded-full' src={compnayInforamtion?.companyInfo?.logo} width={60} height={50} />
                    </div>
                    <p className='flex-1 flex flex-col gap-1'>
                        <h1 className='text-xl font-semibold '>
                            {jobTitle.slice(0, 20)}{jobTitle.length > 20 && '...'}
                        </h1>
                        <p className='text-start'>
                            {compnayInforamtion?.companyInfo?.companyName.slice(0, 30)}{compnayInforamtion?.companyInfo?.companyName.length > 20 && '...'}
                        </p>
                    </p>
                </div>

                <div onClick={handleSave} className='text-[22px] cursor-pointer'>
                    {
                        isLoading ? <AiOutlineLoading3Quarters className="animate-spin m-auto" />:
                        save ?
                            <FaBookmark /> :
                            <FaRegBookmark />
                    }
                </div>
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
                    Applicants Number: {applicantsNumber}
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