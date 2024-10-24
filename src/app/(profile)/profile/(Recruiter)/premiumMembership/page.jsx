"use client"

import useRole from '@/components/Hooks/useRole';
import Modal from '@/components/Modal/Modal';
import React, { useState } from 'react';
import { TbFidgetSpinner } from 'react-icons/tb';
import toast from "react-hot-toast";
import Image from 'next/image';

const PremiumMember = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { loggedInUser } = useRole();

    const [method, setMethod] = useState([{
        "name": "VISA",
        "type": "visa",
        "logo": "https://sandbox.sslcommerz.com/gwprocess/v4/image/gw/visa.png",
        "gw": "visacard",
        "r_flag": "1",
        "redirectGatewayURL": "https://sandbox.sslcommerz.com/gwprocess/v4/bankgw/indexhtmlOTP.php?mamount=1000.00&ssl_id=2310191520231MLVg8ZTsa9Ld4k&Q=REDIRECT&SESSIONKEY=9CE83C4562A96645C7652AF10D220C37&tran_type=success&cardname=visavard"
    },]);

    // const [method, setMethod] = useState([]);

    const PaymentOption = async () => {
        isLoading(true)
        let res = await fetch("/api/payment", { method: 'POST' });
        let JSON = await res.json();
        setIsLoading(false);
        setShow(true);
        setMethod(JSON['data']['desc'])
    };

    const handleApplyNow = () => {
        if (loggedInUser?.role === "seeker") {
            return toast.error("Action not permitted!");
        } else {
            setShowModal(!showModal);
        }
    };

    const PayNow = (PayURL) => {
        window.location.replace(PayURL);
    };

    return (
        <div>
            <button onClick={handleApplyNow} className='py-2 px-6 text-lg font-medium text-white bg-[#2557a7] rounded-md hover:bg-[#0d2d5e]'>Pay Now</button>

            <Modal
                isVisible={showModal}
                showModal={showModal}
                setShowModal={setShowModal}
            >
                <div>
                    <h1>Pay Now</h1>
                    <div className="container-fluid ">
                        <div className="row">

                            {
                                method.map((item, i) => {
                                    return (
                                        <div key={i} className="col-md-2 col-lg-2 col-6 p-1">
                                            <div className="card  h-100 bg-white shadow-sm">
                                                <a onClick={() => { PayNow(item['redirectGatewayURL']) }}>
                                                    {/* <img className="w-100 pay-img" src={item['logo']} /> */}
                                                    <Image
                                                        src={item['logo']}
                                                        alt="Logo"
                                                        width={600}
                                                        height={400}
                                                        className="md:w-32 w-28 h-32 rounded-full mx-auto mb-4 shadow-lg" />
                                                </a>
                                            </div>
                                        </div>
                                    )
                                })
                            }





                        </div>
                    </div>

                </div>
            </Modal>
        </div>
    );
};

export default PremiumMember;