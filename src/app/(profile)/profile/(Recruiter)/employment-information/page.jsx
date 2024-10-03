'use client'
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { useForm } from "react-hook-form";

const profile = {
    employment: {
        companySize: "200-500 employees",
        typesOfJobs: "Full-time, Part-time, Internship",
        salaryScale: "$50k - $150k"
    }
}

const EmploymentInformation = () => {
    const [edit, setEdit] = React.useState(false);
    const {
        register,
        handleSubmit,
    } = useForm();

    const handleSave = async (data) => {
        const { companySize, salaryScale, typesOfJobs } = data;
        console.log({
            companySize,
            typesOfJobs,
            salaryScale
        })
    }

    return (
        <div className='relative border'>
            <button onClick={() => setEdit(!edit)} className='cursor-pointer absolute right-3 top-0 text-2xl'>
                {edit ? <><IoCloseSharp /></> : <><FaRegEdit /></>}
            </button>
            <div>
                <h3 className="text-xl text-center font-semibold">Employment Information</h3>
                {
                    edit ?
                        <form onSubmit={handleSubmit(handleSave)}>
                            <div className="mb-6">
                                <div className='flex items-center gap-1'>
                                    <div className='w-full space-y-3'>
                                        {/* Email */}
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                Company Size
                                            </label>
                                            <input
                                                {...register("companySize")}
                                                defaultValue={profile.employment.companySize}
                                                type="text"
                                                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                            />
                                        </div>
                                        {/* Email */}
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                Types Of Jobs
                                            </label>
                                            <input
                                                {...register("typesOfJobs")}
                                                defaultValue={profile.employment.typesOfJobs}
                                                type="text"
                                                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                            />
                                        </div>
                                        {/* Email */}
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                Salary Scale
                                            </label>
                                            <input
                                                {...register("salaryScale")}
                                                defaultValue={profile.employment.salaryScale}
                                                type="text"
                                                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                            />
                                        </div>
                                    </div>
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
                                <p><strong>Company Size:</strong> {profile.employment.companySize}</p>
                                <p><strong>Types of Jobs:</strong> {profile.employment.typesOfJobs}</p>
                                <p><strong>Salary Scale:</strong> {profile.employment.salaryScale}</p>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default EmploymentInformation;