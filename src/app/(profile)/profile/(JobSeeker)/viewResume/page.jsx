"use client";
import ResumePDF from "@/components/ResumePDF/ResumePDF";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { AiFillPrinter } from "react-icons/ai";
import { useSession } from "next-auth/react";
import axios from "axios";
import Loader from "@/app/loading";

const Resume = () => {
    const contentRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const { data: session } = useSession();

    // Print function with direct inline styles
    const reactToPrintFn = useReactToPrint({
        contentRef,
        pageStyle: `
      @media print {
        @page {
          margin: 20mm;
        }
        .print-content {
          padding: 20px;
          box-sizing: border-box; 
        }
      }
    `,
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/profile/api/${session?.user?.email}`
                );
                setUser(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchUser();
    }, [session?.user?.email]);

    if (loading) {
        return <Loader />;
    }
    if (!user) {
        return (
            <div className="h-screen text-center flex justify-center items-center text-3xl font-bold">
                <h1>Please Update your profile</h1>
            </div>
        );
    }
    if (Object.keys(user).length <= 7) {
        return (
            <div className="h-screen text-center flex justify-center items-center text-3xl font-bold">
                <h1>Please complete your profile to at least 80%</h1>
            </div>
        );
    }

    return (
        <div>
            <div className="p-4 md:p-10 lg:p-16 border rounded shadow-md bg-white">
            <div className="print-content" ref={contentRef}>
                <ResumePDF user={user} />
            </div>
            </div>

            
            <button
                className="mt-4 p-2 hover:bg-hover bg-primary text-white rounded flex mx-auto justify-center items-center gap-2 font-bold"
                onClick={reactToPrintFn}
            >
                <AiFillPrinter />
                Print Resume
            </button>
        </div>
    );
};

export default Resume;
