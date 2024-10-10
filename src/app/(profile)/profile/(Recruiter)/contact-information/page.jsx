'use client'
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { useForm } from "react-hook-form";
import { useSession } from 'next-auth/react';
import useProfileInfo from '@/components/Hooks/useProfileInfo';
import axios from 'axios';
import toast from 'react-hot-toast';

const profile = {
    contact: {
        phone: "+1 234 567 890",
        email: "contact@techsolutions.com",
        website: "https://www.techsolutions.com",
        socialLinks: {
            linkedin: "https://www.linkedin.com/company/techsolutions",
            twitter: "https://twitter.com/techsolutions"
        }
    }
}

const ContactInformation = () => {
    const { data: session } = useSession();
    const { profileInfo } = useProfileInfo();
    const [edit, setEdit] = useState(false)
    const { register, handleSubmit } = useForm();
    const [contactInformation, setContactInformation] = useState(profileInfo?.contactInformation);
    useEffect(() => {
        if (profileInfo?.contactInformation) {
            setContactInformation(profileInfo?.contactInformation)
        }
    }, [profileInfo])

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
            const { data } = await axios.put(`http://localhost:3000/profile/api/${session.user.email}`, { contactInformation });
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
            <button onClick={() => setEdit(!edit)} className='cursor-pointer absolute right-3 top-0 text-2xl'>
                {edit ? <><IoCloseSharp /></> : <><FaRegEdit /></>}
            </button>
            <div>
                <h3 className="text-xl text-center font-semibold">Contact Information</h3>
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
                                        value={contactInformation?.email}
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
                                        className="bg-primary hover:bg-hoverColor px-5 rounded-md py-3 text-white"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                        :
                        <div className='mt-5'>
                            <div className='flex flex-col justify-center items-center w-full max-w-2xl mx-auto border bg-white p-4'>
                                <p><strong>Phone:</strong> {contactInformation?.phone}</p>
                                <p><strong>Email:</strong> {contactInformation?.email}</p>
                                <p><strong>Website:</strong> <a href={contactInformation?.website} className="text-blue-500 underline">{contactInformation?.website}</a></p>
                                <div className="mt-2 flex gap-5">
                                    <strong>Social Links:</strong>
                                    <p className='flex gap-5'>
                                        <a href={contactInformation?.socialLinks?.linkedin} className="text-blue-500 underline">LinkedIn</a>
                                        ||
                                        <a href={contactInformation?.socialLinks?.twitter} className="text-blue-500 underline">Twitter</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default ContactInformation;