import React from 'react';
import Link from "next/link";
const Page = () => {
    return (
        <>
            <div className="container">
                <div className="row h-100  justify-content-center align-items-center">
                    <div className="col-md-2 centered text-center col-sm-12 col-lg-2">
                        <h6 className="my-2">Payment Successful </h6>
                        <Link className="btn mt-2 btn-success" href="/">Premium Details</Link>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Page;