'use client'
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { CgMoveRight } from 'react-icons/cg';
import { IoMdAdd } from 'react-icons/io';
import { MdDeleteOutline } from 'react-icons/md';

const profile = {
    "certifications": [
        {
            "certificationName": "Google Cloud Certified",
            "issuingOrganization": "Google",
            "year": 2023
        },
        {
            "certificationName": "React.js Advanced Course",
            "issuingOrganization": "Udemy",
            "year": 2022
        }
    ],
}

const Certifications = () => {
    const [edit, setEdit] = React.useState(false)
    const [certifications, setCertifications] = React.useState([...profile.certifications])

    const handleAddCertification = () => {
        setCertifications([...certifications, { degree: '', institution: '', startDate: '', endDate: '', fieldOfStudy: '' }]);
    };

    // Remove an Certification
    const removeCertification = (index) => {
        const newActivities = certifications.filter((_, i) => i !== index);
        setCertifications(newActivities);
    };

    const handleSave = async () => {
        console.log('Hello')
    }

    return (
        <div className='relative'>
            <button onClick={() => setEdit(!edit)} className='cursor-pointer absolute right-3 top-0 text-2xl'>
                {edit ? <><IoCloseSharp /></> : <><FaRegEdit /></>}
            </button>
            <div>
                <h3 className="text-xl text-center font-semibold mb-2">Certifications</h3>
                {
                    edit ?
                        <form onSubmit={handleSave}>
                            <div className="w-full max-w-3xl rounded-lg mb-6">
                                {certifications?.map((cert, index) => (
                                    <div key={index}>
                                        <label className="block text-sm font-medium text-gray-700">Certificate</label>
                                        <div className="mb-6 flex items-center">
                                            <div className='w-full'>
                                                <input
                                                    type="text"
                                                    placeholder="Certification Name"
                                                    defaultValue={cert?.certificationName}
                                                    className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Issuing Organization"
                                                    defaultValue={cert?.issuingOrganization}
                                                    className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Year"
                                                    defaultValue={cert?.year}
                                                    className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeCertification(index)}
                                                className="text-red-500 text-4xl"
                                            >
                                                <MdDeleteOutline />

                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddCertification}
                                    className="bg-hoverColor flex items-center gap-1 text-white py-2 px-4 rounded-lg mt-4"
                                >
                                    <IoMdAdd /> <span>Add Certification</span>
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
                                <ul>
                                    {certifications?.map((cert, index) => (
                                        <div key={index} className='flex items-center gap-1'>
                                            <CgMoveRight className='text-xl md:text-2xl' />
                                            <li>{cert?.certificationName} - {cert?.issuingOrganization} ({cert?.year})</li>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default Certifications;