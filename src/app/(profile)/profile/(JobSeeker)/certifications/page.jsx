'use client'
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { CgMoveRight } from 'react-icons/cg';
import { IoMdAdd } from 'react-icons/io';
import { MdDeleteOutline } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import NoInformation from '@/components/shared/NoInformation';
import useSeekerInfo from '@/components/Hooks/useSeekerInfo';

const Certifications = () => {
    const { data: session } = useSession();
    const {seekerInfo} = useSeekerInfo();
    const [edit, setEdit] = useState(false);
    const [certifications, setCertifications] = useState(seekerInfo?.certifications);

    useEffect(() => {
        if (seekerInfo?.certifications) {
            setCertifications(seekerInfo?.certifications)
        }
    }, [seekerInfo])

    const handleAddCertification = () => {
        if (certifications) {
            setCertifications([...certifications, { certificationName: '', issuingOrganization: '', year: '' }]);
            return
        }
        setCertifications([{ certificationName: '', issuingOrganization: '', year: '' }]);
    };

    const handleCertificationChange = (index, field, value) => {
        const newCertifications = [...certifications];
        newCertifications[index][field] = value;
        setCertifications(newCertifications);
    };


    // Remove an Certification
    const removeCertification = (index) => {
        const newActivities = certifications.filter((_, i) => i !== index);
        setCertifications(newActivities);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/profile/api/${session.user.email}`, { certifications });
            if (data?.upsertedId || data?.modifiedCount > 0) {
                toast.success("Updated Successful")
                setEdit(false)
            }
        } catch (err) {
            console.log(err?.message)
            toast.error(err?.message)
        }
    }

    return (
        <div className='relative'>
            <button onClick={() => setEdit(!edit)} className="cursor-pointer absolute right-3 top-0 text-2xl">
                {edit ? <><IoCloseSharp /></> : <><FaRegEdit className={`${!certifications && 'hidden'} cursor-pointer absolute right-3 top-0 text-2xl`} /></>}
            </button>
            <div>
                <h3 className="text-xl text-center font-semibold mb-2">Certifications</h3>
                {
                    edit ?
                        <form onSubmit={handleSave}>
                            <div className="w-full max-w-3xl rounded-lg mb-6">
                                {certifications?.map((cert, index) => (
                                    <div key={index}>
                                        <div className="mb-6 flex items-center">
                                            <div className='w-full'>
                                                <div className="mb-2">
                                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                        Certification Name
                                                    </label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Certification Name"
                                                        defaultValue={cert?.certificationName}
                                                        onChange={(e) => handleCertificationChange(index, 'certificationName', e.target.value)}
                                                        className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                        Issuing Organization
                                                    </label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Issuing Organization"
                                                        defaultValue={cert?.issuingOrganization}
                                                        onChange={(e) => handleCertificationChange(index, 'issuingOrganization', e.target.value)}
                                                        className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                        Year
                                                    </label>
                                                    <input
                                                        required
                                                        type="number"
                                                        placeholder="year"
                                                        defaultValue={cert?.year}
                                                        onChange={(e) => handleCertificationChange(index, 'year', e.target.value)}
                                                        className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                    />
                                                </div>
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
                        <div className='mt-5 flex flex-col justify-center items-center w-full max-w-2xl mx-auto border bg-white p-4'>
                            {
                                certifications ? <>
                                    <div className='flex flex-col w-full max-w-2xl mx-auto border bg-white p-4'>
                                        <ul>
                                            {certifications?.map((cert, index) => (
                                                <div key={index} className='flex items-center gap-1 mb-2'>
                                                    <CgMoveRight className='text-xl md:text-2xl' />
                                                    <li>{cert?.certificationName} - {cert?.issuingOrganization} ({cert?.year})</li>
                                                </div>
                                            ))}
                                        </ul>
                                    </div>
                                </> : <NoInformation setEdit={setEdit} edit={edit} />
                            }

                        </div>
                }
            </div>
        </div>
    );
};

export default Certifications;