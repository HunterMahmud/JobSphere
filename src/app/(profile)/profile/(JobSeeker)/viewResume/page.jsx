"use client"

import ResumePDF from "@/components/ResumePDF/ResumePDF";
import { useRef } from "react";
import { useReactToPrint } from 'react-to-print';
import { AiFillPrinter } from 'react-icons/ai'

const Resume = () => {
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    return (
        <div>
           
            <div ref={contentRef}><ResumePDF/></div>
            <button  className="mt-4 p-2 hover:bg-rose-700  bg-blue-500 text-white rounded flex mx-auto justify-center items-center gap-2 font-bold" onClick={reactToPrintFn}> <AiFillPrinter/>Print Resume</button>
        </div>
    );
};

export default Resume;
