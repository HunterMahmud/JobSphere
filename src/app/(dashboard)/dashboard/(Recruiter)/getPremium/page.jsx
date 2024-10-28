"use client";

import Modal from '@/components/Modal/Modal';
import Image from 'next/image';
import React, { useState } from 'react';
import { FcOk } from "react-icons/fc";
import toast from "react-hot-toast";
import useRole from '@/components/Hooks/useRole';


const GetPremium = () => {
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [method, setMethod] = useState([{
        "name": "VISA",
        "type": "visa",
        "logo": "https://sandbox.sslcommerz.com/gwprocess/v4/image/gw/visa.png",
        "gw": "visacard",
        "r_flag": "1",
        "redirectGatewayURL": "https://sandbox.sslcommerz.com/gwprocess/v4/bankgw/indexhtmlOTP.php?mamount=1000.00&ssl_id=2310191520231MLVg8ZTsa9Ld4k&Q=REDIRECT&SESSIONKEY=9CE83C4562A96645C7652AF10D220C37&tran_type=success&cardname=visavard"
    },]);

    const { loggedInUser } = useRole();

    const PaymentOption = async () => {
        if (loggedInUser?.role === "seeker") {
            return toast.error("Action not permitted!");
        } else {
            setIsLoading(true);
            setShowModal(!showModal);
            let res = await fetch("/api/payment", { method: 'POST' });
            let JSON = await res.json();
            setIsLoading(false);
            setMethod(JSON['data']['desc'])
        }
    };

    const PayNow = (PayURL) => {
        window.location.replace(PayURL);
    }



    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-8">Get Premium</h1>

            <div className='space-y-4 flex flex-col lg:flex-row md:justify-around'>
                <div className="border max-w-[350px] min-h-[400px] px-4 py-6 bg-[url('https://i.ibb.co/hch8Kbm/ix-GTl1715763309.png')] rounded-md shadow-md hover:shadow-xl hover:scale-[1.01] transition-all space-y-2 text-black">
                    <h3 className='text-xl font-semibold text-center my-3'>Get Premium for 1 month</h3>

                    <div className='space-y-3'>
                        <p className='text-lg flex items-center gap-2'><span><FcOk /></span>10 Jobs Post in 1 Month</p>
                        <p className='text-lg flex items-center gap-2'><span><FcOk /></span>Unlimited Blogs in 1 Month</p>
                        <p className='text-lg flex items-center gap-2'><span><FcOk /></span>50 Interview in 1 Month</p>
                        <p className='text-lg flex items-center gap-2'><span><FcOk /></span>Priority Listing for Job Posts for 1 Month</p>
                        <p className='text-lg flex items-center gap-2'><span><FcOk /></span>Priority Listing for Companies for 1 Month</p>
                        <h2 className='text-xl font-semibold text-center'>Price: 2,000 Taka</h2>
                    </div>
                    <div>
                        <button
                            onClick={PaymentOption}
                            className="bg-primary flex justify-center mx-auto text-sm md:text-base text-white px-4 md:px-6 py-2 rounded-lg hover:bg-hover transition"
                        >
                            Buy 1 Month Premium
                        </button>
                    </div>
                </div>

                {/* For 1 Year */}
                <div className="border max-w-[350px] min-h-[400px] px-4 py-6 bg-[url('https://i.ibb.co/hch8Kbm/ix-GTl1715763309.png')] rounded-md shadow-md hover:shadow-xl hover:scale-[1.01] transition-all space-y-2 text-black">
                    <h3 className='text-xl font-semibold text-center my-3'>Get Premium for 1 Year</h3>
                    <div className='space-y-3'>
                        <p className='text-lg flex items-center gap-2'><span><FcOk /></span>Unlimited Jobs Post in 1 Year</p>
                        <p className='text-lg flex items-center gap-2'><span><FcOk /></span>Unlimited Blogs in 1 Year</p>
                        <p className='text-lg flex items-center gap-2'><span><FcOk /></span>Unlimited Interview in 1 Year</p>
                        <p className='text-lg flex items-center gap-2'><span><FcOk /></span>Priority Listing for Job Posts for 1 Year</p>
                        <p className='text-lg flex items-center gap-2'><span><FcOk /></span>Priority Listing for Companies for 1 Year</p>
                        <h2 className='text-xl font-semibold text-center'>Price: 20,000 Taka</h2>
                    </div>
                    <button
                        onClick={PaymentOption}
                        className="bg-primary flex justify-center mx-auto text-sm md:text-base text-white px-4 md:px-6 py-2 rounded-lg hover:bg-hover transition"
                    >
                        Buy 1 Year Premium
                    </button>
                </div>
            </div>

            {/* Modal */}
            {
                <Modal isVisible={showModal} showModal={showModal} setShowModal={setShowModal}>
                    <p className='text-lg  text-center font-semibold mb-2'>Select Payment Method</p>
                    <div className='grid grid-cols-4 md:grid-cols-6 h-3/4'>
                        {
                            method.map((item, i) => {
                                return (
                                    <div key={i} className="p-1">
                                        <div className="card h-100 bg-white hover:bg-slate-200 hover:border-2 hover:border-blue-200 hover:shadow-md shadow-sm">
                                            <a onClick={() => { PayNow(item['redirectGatewayURL']) }}>
                                                <Image alt='logo' className="w-100 pay-img" width={100} height={100} src={item['logo']} />
                                            </a>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Modal>
            }

        </div>
    );
};

export default GetPremium;