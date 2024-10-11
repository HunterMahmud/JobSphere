'use client'
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { IoMdAdd } from 'react-icons/io';
import { MdDeleteOutline } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import axios from 'axios';
import NoInformation from '@/components/shared/NoInformation';
import useSeekerInfo from '@/components/Hooks/useSeekerInfo';

const WorkExperience = () => {
    const { data: session } = useSession();
    const {seekerInfo} = useSeekerInfo();
    const [edit, setEdit] = useState(false);
    const [workExperience, setWorkExperience] = useState(seekerInfo?.workExperience);
    console.log(workExperience)
    useEffect(() => {
        if (seekerInfo?.workExperience) {
            setWorkExperience(seekerInfo?.workExperience)
        }
    }, [seekerInfo])

    const handleAddWorkExperience = () => {
        if (workExperience) {
            setWorkExperience([...workExperience, { jobTitle: '', companyName: '', startDate: '', endDate: '', responsibilities: '' }]);
            return
        }
        setWorkExperience([{ jobTitle: '', companyName: '', startDate: '', endDate: '', responsibilities: '' }]);
    };

    const handleWorkExperienceChange = (index, field, value) => {
        const newWorkExperience = [...workExperience];
        newWorkExperience[index][field] = value;
        setWorkExperience(newWorkExperience);
    };

    // Remove an workExperience
    const removeWorkExperience = (index) => {
        const newWorkExperience = workExperience.filter((_, i) => i !== index);
        setWorkExperience(newWorkExperience);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/profile/api/${session.user.email}`, { workExperience });
            if (data?.modifiedCount > 0) {
                toast.success("Updated Successful")
                setEdit(false)
            }
        } catch (err) {
            console.log(err?.message)
        }
    }

    return (
        <div className='relative border'>
            <button onClick={() => setEdit(!edit)} className="cursor-pointer absolute right-3 top-0 text-2xl">
                {edit ? <><IoCloseSharp /></> : <><FaRegEdit className={`${!workExperience && 'hidden'} cursor-pointer absolute right-3 top-0 text-2xl`} /></>}
            </button>
            <div>
                <h3 className="text-xl text-center font-semibold">Work Experience</h3>
                {
                    edit ?
                        <form onSubmit={handleSave}>
                            <div className="w-full mb-6">
                                {workExperience?.map((experience, index) => (
                                    <div key={index}>
                                        <div className="mb-6 flex items-center gap-1">
                                            <div className='w-full'>
                                                <div className="mb-2">
                                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                        Job Title
                                                    </label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Job Title"
                                                        defaultValue={experience?.jobTitle}
                                                        onChange={(e) => handleWorkExperienceChange(index, 'jobTitle', e.target.value)}
                                                        className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                        Company Name
                                                    </label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Company Name"
                                                        defaultValue={experience?.companyName}
                                                        onChange={(e) => handleWorkExperienceChange(index, 'companyName', e.target.value)}
                                                        className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                        Started Date
                                                    </label>
                                                    <input
                                                        required
                                                        type="date"
                                                        placeholder="Started Date"
                                                        defaultValue={experience?.startDate}
                                                        onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                                                        className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                        Ending Date
                                                    </label>
                                                    <input
                                                        required
                                                        type="date"
                                                        placeholder="Ending Date"
                                                        defaultValue={experience?.endDate}
                                                        onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                                                        className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                        responsibilities
                                                    </label>
                                                    <input
                                                        required
                                                        key={index}
                                                        type="text"
                                                        placeholder="responsibilities"
                                                        defaultValue={experience?.responsibilities}
                                                        onChange={(e) => handleWorkExperienceChange(index, 'responsibilities', e.target.value)}
                                                        className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeWorkExperience(index)}
                                                className="text-red-500 text-4xl"
                                            >
                                                <MdDeleteOutline />

                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddWorkExperience}
                                    className="bg-hoverColor flex items-center gap-1 text-white py-2 px-4 rounded-lg mt-4"
                                >
                                    <IoMdAdd /> <span>Add Experience</span>
                                </button>
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
                        <div className='mt-5 flex flex-col justify-center items-center w-full max-w-2xl mx-auto border bg-white p-4'>
                            {
                                workExperience ? <>
                                    <div className='flex flex-col w-full max-w-2xl mx-auto border bg-white p-4'>
                                        {workExperience?.map((experience, index) => (
                                            <div key={index} className="mb-4">
                                                <h4 className="font-semibold">
                                                    {experience.jobTitle} | {experience.companyName}
                                                </h4>
                                                <p><strong>Start Date : </strong>{experience.startDate}</p>
                                                <p><strong>End Date : </strong>{experience.endDate}</p>
                                                <p><strong>Responsibilities : </strong>{experience?.responsibilities}</p>
                                            </div>
                                        ))}
                                    </div>
                                </> : <NoInformation setEdit={setEdit} edit={edit} />
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default WorkExperience;