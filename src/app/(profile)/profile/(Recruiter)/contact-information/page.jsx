'use client'
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { useForm } from "react-hook-form";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import NoInformation from '@/components/shared/NoInformation';
import useCompanyInfo from '@/components/Hooks/useCompanyInfo';


const ContactInformation = () => {
    const { data: session } = useSession();
    const { companyInfo } = useCompanyInfo();
    const [edit, setEdit] = useState(false)
    const { register, handleSubmit } = useForm();
    const [contactInformation, setContactInformation] = useState(companyInfo?.contactInformation);
    useEffect(() => {
        if (companyInfo?.contactInformation) {
            setContactInformation(companyInfo?.contactInformation)
        }
    }, [companyInfo])

    const handleSave = async (data) => {
        const { email, phone, linkedin, twitter, website } = data;
        const contactInformation = {
            email,
            phone,
            website,
            socialLinks: {
                linkedin,
                twitter
            }
        }
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/profile/api/company/${session.user.email}`, { contactInformation });
            if (data?.upsertedId || data?.modifiedCount > 0) {
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
            <button onClick={() => setEdit(!edit)} className="cursor-pointer absolute right-0 md:right-3 top-[3px] text-2xl">
                {edit ? <><IoCloseSharp /></> : <><FaRegEdit className={`${!contactInformation && 'hidden'}`} /></>}
            </button>
            <div>
                <h3 className="text-start md:text-center text-xl font-semibold mb-5">Contact Information</h3>
                {
                    edit ?
                        <form onSubmit={handleSubmit(handleSave)} className="mt-5 grid grid-cols-1 justify-center items-center md:gap-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-5 w-full">
                                {/* Email */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                        Email
                                    </label>
                                    <input
                                        {...register("email")}
                                        value={session.user?.email}
                                        type="email"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                {/* phoneNumber */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                        Phone Number
                                    </label>
                                    <input
                                        {...register("phone")}
                                        defaultValue={contactInformation?.phone}
                                        type="text"
                                        placeholder="Enter Phone Number"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                {/* website */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                        Website
                                    </label>
                                    <input
                                        {...register("website")}
                                        defaultValue={contactInformation?.website}
                                        type="text"
                                        placeholder="Enter Phone Number"
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
                                        placeholder="Enter linkedin account link"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                {/* twitter */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                        Twitter
                                    </label>
                                    <input
                                        {...register("twitter")}
                                        defaultValue={contactInformation?.socialLinks?.twitter}
                                        type="text"
                                        placeholder="Enter twitter account link"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                            </div>
                            <div className='col-span-2'>
                                <div className=' flex justify-end items-end'>
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-hoverColor px-5 rounded-md py-3 text-white mt-5 md:mt-0"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                        :
                        <div className='mt-5 flex flex-col justify-center items-center w-full max-w-2xl mx-auto border md:bg-white md:p-4'>
                            {
                                contactInformation ? <>
                                    <div className='flex flex-col justify-cente items-center w-full max-w-2xl mx-auto bg-white p-2 md:p-4'>
                                        <div className='space-y-1'>
                                            {contactInformation?.phone && <p><strong>Phone:</strong> {contactInformation?.phone}</p>}
                                            {contactInformation?.email && <p><strong>Email:</strong> {contactInformation?.email}</p>}
                                            {contactInformation?.website && <p><strong>Website:</strong> <a href={contactInformation?.website} className="text-blue-500 underline">{contactInformation?.website}</a></p>}
                                            {
                                                contactInformation?.socialLinks &&
                                                <div className="flex flex-col md:flex-row md:gap-5">
                                                    <strong>Social Links:</strong>
                                                    <p className='flex gap-5'>
                                                        {contactInformation?.socialLinks?.linkedin && <a href={contactInformation?.socialLinks?.linkedin} className="text-blue-500 underline">LinkedIn</a>}
                                                        {contactInformation?.socialLinks?.linkedin && contactInformation?.socialLinks?.twitter && <span >||</span>}
                                                        {contactInformation?.socialLinks?.twitter && <a href={contactInformation?.socialLinks?.twitter} className="text-blue-500 underline">Twitter</a>}
                                                    </p>
                                                </div>
                                            }
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

export default ContactInformation;