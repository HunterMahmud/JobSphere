import React from 'react';
import Link from "next/link";
const Page = () => {
    return (
        <>
            <div className="container">
                <div className="row h-100  justify-content-center align-items-center">
                    <div className="col-md-2 centered text-center col-sm-12 col-lg-2">
                        <h6 className="my-2">Payment Cancel</h6>
                        <Link className="btn mt-2 btn-danger" href="/dashboard/getPremium"><button
                        className="bg-primary flex justify-center mx-auto text-sm md:text-base text-white px-4 md:px-6 py-2 rounded-lg hover:bg-hover transition"
                    >
                        Try Again
                    </button></Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;