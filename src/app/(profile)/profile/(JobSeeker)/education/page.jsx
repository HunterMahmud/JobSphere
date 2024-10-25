'use client'
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { IoMdAdd } from 'react-icons/io';
import { MdDeleteOutline } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import NoInformation from '@/components/shared/NoInformation';
import useSeekerInfo from '@/components/Hooks/useSeekerInfo';

const Education = () => {
    const { data: session } = useSession();
    const [edit, setEdit] = useState(false);
    const {seekerInfo} = useSeekerInfo();
    const [education, setEducation] = useState(seekerInfo?.education);
    useEffect(() => {
        if (seekerInfo?.education) {
            setEducation(seekerInfo?.education);
        }   
    }, [seekerInfo]);

    const handleAddEducation = () => {
        if (education) {
            setEducation([...education, { degreeName: '', instituteName: '', cgpa: '', passingYear: '' }]);
            return
        }
        setEducation([{ degreeName: '', instituteName: '', cgpa: '', passingYear: '' }]);
    };

    const handleEducationChange = (index, field, value) => {
        const newEducation = [...education];
        newEducation[index][field] = value;
        setEducation(newEducation);
    };

    // Remove an education
    const removeEducation = (index) => {
        const newEducation = education.filter((_, i) => i !== index);
        setEducation(newEducation);
    };

    const handleSave = async (e) => {
        e.preventDefault()
        console.log(education)
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/profile/api/${session.user.email}`, { education });
            if (data?.upsertedId || data?.modifiedCount > 0) {
                toast.success("Updated Successful")
                setEdit(false)
            }
        } catch (err) {
            console.log(err?.message)
        }
    }

    return (
        <div className='relative border'>
            <button onClick={() => setEdit(!edit)} className="cursor-pointer absolute right-0 md:right-3 top-[3px] text-2xl">
                {edit ? <><IoCloseSharp /></> : <><FaRegEdit className={`${!education && 'hidden'}`} /></>}
            </button>
            <div>
                <h3 className="text-xl md:text-center font-semibold mb-5">Education</h3>
                {
                    edit ?
                        <form onSubmit={handleSave}>
                            <div className="">
                                {education?.map((edu, index) => (
                                    <div key={index} className="mb-6">
                                        <div className='flex items-center gap-1 border-b-2 border-b-white'>
                                            <div className='w-full'>
                                                <div className="mb-2">
                                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                        Degree Name
                                                    </label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Degree"
                                                        defaultValue={edu?.degreeName}
                                                        onChange={(e) => handleEducationChange(index, 'degreeName', e.target.value)}
                                                        className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                        Institute Name
                                                    </label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Institution"
                                                        defaultValue={edu?.instituteName}
                                                        onChange={(e) => handleEducationChange(index, 'instituteName', e.target.value)}
                                                        className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                        CGPA
                                                    </label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Start Year"
                                                        defaultValue={edu?.cgpa}
                                                        onChange={(e) => handleEducationChange(index, 'cgpa', e.target.value)}
                                                        className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                        Passing Year
                                                    </label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="End Year"
                                                        defaultValue={edu?.passingYear}
                                                        onChange={(e) => handleEducationChange(index, 'passingYear', e.target.value)}
                                                        className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                    />
                                                </div>
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
                                    className="bg-primary flex items-center gap-1 text-white py-2 px-4 rounded-lg mt-4"
                                >
                                    <IoMdAdd /> <span>Add Education</span>
                                </button>
                            </div>
                            <div className='col-span-2'>
                                <div className=' flex justify-end items-end'>
                                    <button
                                        type="submit"
                                        className="bg-hover hover:bg-hoverColor px-5 rounded-md py-3 text-white"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                        :
                        <div className='mt-5 flex flex-col justify-center items-center w-full max-w-2xl mx-auto border bg-white p-4'>
                            {
                                education ? <>
                                    <div className='flex flex-col gap-5 w-full max-w-2xl mx-auto'>
                                        {education?.map((edu, index) => (
                                            <div key={index}>
                                                <h4 className="font-semibold text-lg">{edu?.degreeName}</h4>
                                                <p><strong>Institute Name : </strong>{edu?.instituteName}</p>
                                                <p><strong>Cgpa : </strong>{edu?.cgpa}</p>
                                                <p><strong>Passing Year : </strong>{edu?.passingYear}</p>
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

export default Education;