'use client'
import Image from 'next/image';
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { useForm } from "react-hook-form";

const overview = {
    fullName: "John Doe",
    profilePicture: "https://example.com/profile-picture.jpg",
    address: "123 Main St",
    city: "New York",
    country: "USA",
    wantJob: true,
    preferredJobPosition: "Frontend Developer",
    preferredJobType: "Full-Time"
}

const ProfileOverview = () => {
    const [edit, setEdit] = React.useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleSave = async () => {
        console.log('Hello')
    }

    return (
        <div className='relative'>
            <button onClick={() => setEdit(!edit)} className='cursor-pointer absolute right-3 top-0 text-2xl'>
                {edit ? <><IoCloseSharp /></> : <><FaRegEdit /></>}
            </button>
            <div>
                <h2 className='text-center'>Profile Overview</h2>
                {
                    edit ?
                        <form onSubmit={handleSubmit(handleSave)} className="mt-10 grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-5">
                            {/* Name */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                    Full Name
                                </label>
                                <input
                                    {...register("name")}
                                    defaultValue={overview.fullName}
                                    type="text"
                                    placeholder="Enter Your Name"
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            {/* phoneNumber */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                    Professional Title
                                </label>
                                <input
                                    {...register("professionalTitle")}
                                    defaultValue={overview.professionalTitle}
                                    type="text"
                                    placeholder="Enter Your Professional Title"
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            {/* Location */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                    Location
                                </label>
                                <input
                                    {...register("location")}
                                    defaultValue={overview.location}
                                    type="text"
                                    placeholder="Enter Your Location"
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            {/* profilePicture */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                    Profile Picture
                                </label>
                                <input
                                    {...register("profilePicture")}
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                />
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
                        <div>
                            <Image src={overview.profilePicture} alt="ProfileImg" width={500} height={200} />
                            <p><strong>Full Name:</strong> {overview.fullName}</p>
                            <p><strong>Address:</strong> {overview.address}, {overview.city}, {overview.country}</p>
                            <p><strong>Looking for a Job?</strong> {overview.wantJob ? "Yes" : "No"}</p>
                            <p><strong>Preferred Job Position:</strong> {overview.preferredJobPosition}</p>
                            <p><strong>Preferred Job Type:</strong> {overview.preferredJobType}</p>
                        </div>
                    
                }

            </div>
        </div>
    );
};

export default ProfileOverview;