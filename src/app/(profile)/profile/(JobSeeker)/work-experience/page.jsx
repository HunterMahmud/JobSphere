'use client'
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { useForm } from "react-hook-form";
import { CgMoveRight } from 'react-icons/cg';
import { IoMdAdd } from 'react-icons/io';
import { MdDeleteOutline } from 'react-icons/md';

const profile = {
    "workExperience": [
        {
            "jobTitle": "Frontend Developer",
            "companyName": "ABC Company",
            "startDate": "Jan 2022",
            "endDate": "Present",
            "responsibilities": [
                "Developed and maintained scalable web applications using React.js, enhancing user engagement by 20%.",
                "Collaborated with cross-functional teams to design intuitive UI/UX solutions."
            ]
        }
    ],
}

const WorkExperience = () => {
    const [edit, setEdit] = React.useState(false);
    const [workExperience, setWorkExperience] = React.useState([...profile.workExperience]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleAddWorkExperience = () => {
        setWorkExperience([...workExperience, { jobTitle: '', companyName: '', startDate: '', endDate: '', responsibilities: '' }]);
    };

    // Remove an workExperience
    const removeWorkExperience = (index) => {
        const newWorkExperience = workExperience.filter((_, i) => i !== index);
        setWorkExperience(newWorkExperience);
    };

    const handleSave = async () => {
        console.log('Hello')
    }

    return (
        <div className='relative border'>
            <button onClick={() => setEdit(!edit)} className='cursor-pointer absolute right-3 top-0 text-2xl'>
                {edit ? <><IoCloseSharp /></> : <><FaRegEdit /></>}
            </button>
            <div>
                <h3 className="text-xl text-center font-semibold">Projects</h3>
                {
                    edit ?
                        <form onSubmit={handleSubmit(handleSave)}>
                            <div className="w-full mb-6">
                                {workExperience.map((experience, index) => (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Work Experience</label>
                                        <div key={index} className="mb-6 flex items-center gap-1">
                                            <div className='w-full'>
                                                <input
                                                    type="text"
                                                    placeholder="Job Title"
                                                    defaultValue={experience.jobTitle}
                                                    className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Company Name"
                                                    defaultValue={experience.companyName}
                                                    className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Company Name"
                                                    defaultValue={experience.startDate}
                                                    className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Company Name"
                                                    defaultValue={experience.endDate}
                                                    className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                />
                                                <input
                                                    key={index}
                                                    type="text"
                                                    placeholder="Job Title"
                                                    defaultValue={experience.responsibilities}
                                                    className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                />
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
                                    <IoMdAdd /> <span>Add Activity</span>
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
                        <div className='mt-5'>
                            <div className='flex flex-col justify-center items-center w-full max-w-2xl mx-auto border bg-white p-4'>
                                {profile.workExperience.map((experience, index) => (
                                    <div key={index} className="mb-4">
                                        <h4 className="font-semibold">
                                            {experience.jobTitle} | {experience.companyName}
                                        </h4>
                                        <p>{experience.startDate} - {experience.endDate}</p>
                                        {experience.responsibilities?.map((responsibility, idx) => (
                                            <div key={index} className='flex gap-1'>
                                                <CgMoveRight className='text-xl md:text-2xl' />
                                                <p>{responsibility}</p>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                }

            </div>
        </div>
    );
};

export default WorkExperience;