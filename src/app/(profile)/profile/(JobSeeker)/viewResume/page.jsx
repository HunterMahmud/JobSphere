"use client"
import ResumePDF from "@/components/ResumePDF/ResumePDF";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from 'react-to-print';
import { AiFillPrinter } from 'react-icons/ai'
import { useSession } from "next-auth/react";
import axios from "axios";
import Loader from "@/app/loading";

const Resume = () => {
    const contentRef = useRef(null);
    const [loading ,setLoading]=useState(true)
    const [user ,setUser]=useState()
    const reactToPrintFn = useReactToPrint({ contentRef });
    const {data:seasons}=useSession()
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/profile/api/${seasons?.user?.email}`);
                 setUser(data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data: ", error);
                setLoading(false)
            }
        };

        fetchJobs();
    }, []);
    if (loading) {
     return <Loader/>  
    }
    if (!user) {
      return <div className="h-screen text-center flex justify-center items-center text-3xl font-bold"><h1>Please Update your profile </h1></div>  
    }
    if (Object.keys(user).length <= 7) {
      return <div className="h-screen text-center flex justify-center items-center text-3xl font-bold"><h1>Please complete your profile minimum 80 % </h1></div>  
    }
    
    return (
        <div>
           
            <div className="" ref={contentRef}><ResumePDF user={user} /></div>
            <button  className="mt-4 p-2 hover:bg-rose-700  bg-blue-500 text-white rounded flex mx-auto justify-center items-center gap-2 font-bold" onClick={reactToPrintFn}> <AiFillPrinter/>Print Resume</button>
        </div>
    );
};

export default Resume;
