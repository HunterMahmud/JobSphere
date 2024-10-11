'use client'
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import NoInformation from '@/components/shared/NoInformation';
import useSeekerInfo from '@/components/Hooks/useSeekerInfo';

const PersonalInformation = () => {
    const { data: session } = useSession();
    const {seekerInfo} = useSeekerInfo();
    const [edit, setEdit] = useState(false)
    const [contactInformation, setContactInformation] = useState(seekerInfo?.contactInformation)
    useEffect(() => {
        if (seekerInfo?.contactInformation) {
            setContactInformation(seekerInfo?.contactInformation)
        }
    }, [seekerInfo])

    const {
        register,
        handleSubmit,
    } = useForm();

    const handleSave = async (data) => {
        const { email, phoneNumber, linkedin, github, portfolio } = data;
        const contactInformation = {
            email,
            phoneNumber,
            "socialLinks": {
                linkedin,
                github,
                portfolio
            }
        }
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/profile/api/${session.user.email}`, { contactInformation });
            if (data?.modifiedCount > 0) {
                toast.success("Updated Successful")
                setContactInformation(contactInformation)
                setEdit(false);
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className='relative border'>
            <button onClick={() => setEdit(!edit)} className="cursor-pointer absolute right-3 top-0 text-2xl">
                {edit ? <><IoCloseSharp /></> : <><FaRegEdit className={`${!contactInformation && 'hidden'} cursor-pointer absolute right-3 top-0 text-2xl`} /></>}
            </button>
            <div>
                <h3 className="text-xl text-center font-semibold">Personal Information</h3>
                {
                    edit ?
                        <form onSubmit={handleSubmit(handleSave)} className="mt-10 grid grid-cols-1 justify-center items-center gap-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-5">
                                {/* Email */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                        Email
                                    </label>
                                    <input
                                        {...register("email")}
                                        value={session.user?.email}
                                        type="email"
                                        placeholder="Enter Your Email"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                {/* phoneNumber */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                        Phone Number
                                    </label>
                                    <input
                                        {...register("phoneNumber")}
                                        defaultValue={contactInformation?.phoneNumber}
                                        type="text"
                                        placeholder="Enter Your Phone Number"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                <div className='md:col-span-2'>
                                    <h1 className='font-medium'>Social Links</h1>
                                </div>
                                {/* linkedin */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                        Linkedin
                                    </label>
                                    <input
                                        {...register("linkedin")}
                                        defaultValue={contactInformation?.socialLinks?.linkedin}
                                        type="text"
                                        placeholder="Enter Your linkedin account link"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                {/* github */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                        Github
                                    </label>
                                    <input
                                        {...register("github")}
                                        defaultValue={contactInformation?.socialLinks?.github}
                                        type="text"
                                        placeholder="Enter Your github account link"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                {/* portfolio */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                        Portfolio
                                    </label>
                                    <input
                                        {...register("portfolio")}
                                        defaultValue={contactInformation?.socialLinks?.portfolio}
                                        type="text"
                                        placeholder="Enter Your portfolio account link"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                            </div>
                            <div className='col-span-2'>
                                <div className=' flex justify-end items-end'>
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-hoverColor px-5 rounded-md py-3 text-white"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                        :
                        <div className='flex flex-col justify-center items-center w-full max-w-2xl mx-auto border bg-white p-4'>
                            {
                                contactInformation ? <>
                                    <div className='flex flex-col justify-center items-center w-full max-w-2xl mx-auto border bg-white p-4'>
                                        <p><strong>Email:</strong> {contactInformation?.email}</p>
                                        <p><strong>Phone Number:</strong> {contactInformation?.phoneNumber}</p>
                                        <div className="mt-4">
                                            <a
                                                href={contactInformation?.socialLinks?.linkedin}
                                                className="text-blue-500 hover:underline"
                                            >
                                                LinkedIn
                                            </a>{" "}
                                            |{" "}
                                            <a
                                                href={contactInformation?.socialLinks?.github}
                                                className="text-blue-500 hover:underline"
                                            >
                                                GitHub
                                            </a>{" "}
                                            |{" "}
                                            <a
                                                href={contactInformation?.socialLinks?.portfolio}
                                                className="text-blue-500 hover:underline"
                                            >
                                                Portfolio
                                            </a>
                                        </div>
                                    </div>
                                </> : <NoInformation setEdit={setEdit} edit={edit} />
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default PersonalInformation;