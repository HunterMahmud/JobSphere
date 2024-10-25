'use client'
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { useForm } from "react-hook-form";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import NoInformation from '@/components/shared/NoInformation';
import useCompanyInfo from '@/components/Hooks/useCompanyInfo';

const EmploymentInformation = () => {
    const { data: session } = useSession();
    const { companyInfo } = useCompanyInfo();
    const [edit, setEdit] = useState(false);
    const [employmentInfo, setEmploymentInfo] = useState(companyInfo?.employmentInfo);

    useEffect(() => {
        if (companyInfo?.employmentInfo) {
            setEmploymentInfo(companyInfo?.employmentInfo)
        }
    }, [companyInfo])

    const {
        register,
        handleSubmit,
    } = useForm();

    const handleSave = async (data) => {
        const { companySize, typesOfJobs } = data;

        const employmentInfo = {
            companySize,
            typesOfJobs,
        }

        try {
            console.log(employmentInfo)
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/profile/api/company/${session.user.email}`, { employmentInfo });
            if (data?.upsertedId || data?.modifiedCount > 0) {
                toast.success("Updated Successful")
                setEmploymentInfo(employmentInfo)
                setEdit(false);
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className='relative border'>
            <button onClick={() => setEdit(!edit)} className="cursor-pointer absolute right-0 md:right-3 top-[3px] text-2xl">
                {edit ? <><IoCloseSharp /></> : <><FaRegEdit className={`${!employmentInfo && 'hidden'}`} /></>}
            </button>
            <div>
                <h3 className="text-start md:text-center text-xl font-semibold mb-5">Employment Info<span className='hidden'>rmation</span></h3>
                {
                    edit ?
                        <form onSubmit={handleSubmit(handleSave)}>
                            <div className="mb-6">
                                <div className='flex items-center gap-1'>
                                    <div className='w-full space-y-3'>
                                        {/* Company Size */}
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                Company Size
                                            </label>
                                            <input
                                                {...register("companySize")}
                                                defaultValue={employmentInfo?.companySize}
                                                type="text"
                                                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                            />
                                        </div>
                                        {/*  Types Of Jobs */}
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                Types Of Jobs
                                            </label>
                                            <input
                                                {...register("typesOfJobs")}
                                                defaultValue={employmentInfo?.typesOfJobs}
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
                        <div className='mt-5 flex flex-col justify-center items-center w-full max-w-2xl mx-auto border bg-white p-2 md:p-4'>

                            {
                                employmentInfo ? <>
                                    <div className='flex flex-col justify-center items-center w-full max-w-2xl mx-auto'>
                                        <div>
                                            {employmentInfo?.companySize && <p><strong>Company Size:</strong> {employmentInfo?.companySize}</p>}
                                            {employmentInfo?.typesOfJobs && <p><strong>Types of Jobs:</strong> {employmentInfo?.typesOfJobs}</p>}
                                        </div>
                                    </div>
                                </> : <NoInformation setEdit={setEdit} edit={edit} />
                            }

                        </div>
                }
            </div>
        </div>
    );
};

export default EmploymentInformation;