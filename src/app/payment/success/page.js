import React from 'react';
import Link from "next/link";
import Image from 'next/image';
const Page = () => {
    return (
        <>
            <div className="">
                <div className="">
                        <h6 className="my-2 text-center text-2xl">Payment Success</h6>
                        <Image alt='success' src={"https://i.ibb.co.com/bXVKryK/success.jpg"} width={400} height={300} className='mx-auto flex justify-center'/>
                        <Link className="btn mt-2 btn-danger" href="/dashboard"><button
                        className="bg-primary flex justify-center mx-auto text-sm md:text-base text-white px-4 md:px-6 py-2 rounded-lg hover:bg-hover transition"
                    >
                        Back To Dashboard
                    </button></Link>
                </div>
            </div>

        </>
    );
};

export default Page;