import React from 'react';
import Link from "next/link";
const Page = () => {
    return (
        <>
            <div className="">
                <div className="h-100">
                    <div className="">
                        <h6 className="my-2 text-center text-2xl">Payment Fail</h6>
                        <Link className="btn mt-2 btn-danger" href="/"><button
                        className="bg-primary flex justify-center mx-auto text-sm md:text-base text-white px-4 md:px-6 py-2 rounded-lg hover:bg-hover transition"
                    >
                        Buy 1 Year Premium
                    </button></Link>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Page;