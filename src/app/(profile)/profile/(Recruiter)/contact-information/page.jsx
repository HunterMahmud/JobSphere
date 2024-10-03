'use client'
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { useForm } from "react-hook-form";

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
    const [edit, setEdit] = React.useState(false)
    const { register, handleSubmit } = useForm();

    const handleSave = async (data) => {
        const { email, phone, linkedin, twitter, website } = data;
        try {
            console.log({
                email,
                phone,
                website,
                linkedin,
                twitter
            })
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
                                        defaultValue={profile.contact.email}
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
                                        defaultValue={profile?.contact?.phone}
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
                                        defaultValue={profile?.contact?.website}
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
                                        defaultValue={profile.contact.socialLinks.linkedin}
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
                                        defaultValue={profile.contact.socialLinks.twitter}
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
                                <p><strong>Phone:</strong> {profile.contact.phone}</p>
                                <p><strong>Email:</strong> {profile.contact.email}</p>
                                <p><strong>Website:</strong> <a href={profile.contact.website} className="text-blue-500 underline">{profile.contact.website}</a></p>
                                <div className="mt-2 flex gap-5">
                                    <strong>Social Links:</strong>
                                    <p className='flex gap-5'>
                                        <a href={profile.contact.socialLinks.linkedin} className="text-blue-500 underline">LinkedIn</a>
                                        ||
                                        <a href={profile.contact.socialLinks.twitter} className="text-blue-500 underline">Twitter</a>
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