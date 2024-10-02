'use client'
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { useForm } from "react-hook-form";
import { IoMdAdd } from 'react-icons/io';
import { MdDeleteOutline } from 'react-icons/md';

const profile = {
    "education": [
        {
            "degree": "B.Sc. in Computer Science",
            "institution": "XYZ University",
            "startDate": "2018",
            "endDate": "2022",
            "fieldOfStudy": "Computer Science"
        }
    ],
}

const Education = () => {
    const [edit, setEdit] = React.useState(false);
    const [education, setEducation] = React.useState([...profile.education]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleAddEducation = () => {
        setEducation([...education, { degree: '', institution: '', startDate: '', endDate: '', fieldOfStudy: '' }]);
    };

    // Remove an education
    const removeEducation = (index) => {
        const newEducation = education.filter((_, i) => i !== index);
        setEducation(newEducation);
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
                <h3 className="text-xl text-center font-semibold">Education</h3>
                {
                    edit ?
                        <form onSubmit={handleSubmit(handleSave)}>
                            <div className="">
                                {education?.map((edu, index) => (
                                    <div key={index} className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700">Education</label>
                                        <div className='flex items-center gap-1'>
                                            <div className='w-full'>
                                                <input
                                                    type="text"
                                                    placeholder="Degree"
                                                    defaultValue={edu?.degree}
                                                    className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Institution"
                                                    defaultValue={edu?.institution}
                                                    className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Start Year"
                                                    defaultValue={edu?.startDate}
                                                    className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="End Year"
                                                    defaultValue={edu?.endDate}
                                                    className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Field Of Study"
                                                    defaultValue={edu?.fieldOfStudy}
                                                    className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeEducation(index)}
                                                className="text-red-500 text-4xl"
                                            >
                                                <MdDeleteOutline />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddEducation}
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
                                {education?.map((edu, index) => (
                                    <div key={index}>
                                        <h4 className="font-semibold">{edu?.degree} | {edu?.institution}</h4>
                                        <p>{edu?.startDate} - {edu?.endDate}</p>
                                        <p>{edu?.fieldOfStudy}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                }

            </div>
        </div>
    );
};

export default Education;