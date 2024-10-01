'use client'
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

const Certifications = () => {
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
                           
                        </div>
                    
                }

            </div>
        </div>
    );
};

export default Certifications;