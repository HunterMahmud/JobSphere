'use client'
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { useForm } from "react-hook-form";
import axios from 'axios';
import useProfileInfo from '@/components/Hooks/useProfileInfo';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import NoInformation from '@/components/shared/NoInformation';

const CareerObjective = () => {
    const { data: session } = useSession();
    const { profileInfo } = useProfileInfo();
    const [edit, setEdit] = React.useState(false);
    const [careerObjective, setCareerObjective] = useState(profileInfo?.careerObjective || '')
    useEffect(() => {
        if (profileInfo?.careerObjective) {
            setCareerObjective(profileInfo?.careerObjective)
        }
    }, [profileInfo])
    const {
        register,
        handleSubmit,
    } = useForm();

    const handleSave = async (data) => {
        const { careerObjective } = data;
        try {
            const { data } = await axios.put(`http://localhost:3000/profile/api/${session.user.email}`, { careerObjective });
            if (data?.modifiedCount > 0) {
                setCareerObjective(careerObjective);
                toast.success("Updated Successful");
                setEdit(!edit);
            }
        } catch (err) {
            console.log(err?.message)
        }
    }

    return (
        <div className='relative border'>
            <button onClick={() => setEdit(!edit)} className="cursor-pointer absolute right-3 top-0 text-2xl">
                {edit ? <><IoCloseSharp /></> : <><FaRegEdit className={`${!careerObjective && 'hidden'} cursor-pointer absolute right-3 top-0 text-2xl`} /></>}
            </button>
            <div>
                <h3 className="text-xl md:text-center font-semibold">Career Objective</h3>
                {
                    edit ?
                        <form onSubmit={handleSubmit(handleSave)} className='mt-5'>
                            <div className='w-full'>
                                <textarea
                                    {...register("careerObjective", {
                                        required: {
                                            value: true,
                                            message: "This field is required.",
                                        },
                                    })}
                                    defaultValue={careerObjective || ''}
                                    type="textarea"
                                    placeholder="Write your carrer objective"
                                    className="block w-full px-4 py-2 min-h-[150px] text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            <div className='col-span-2'>
                                <div className='mt-5 flex justify-end items-end'>
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
                                careerObjective ? <>
                                    <div className='flex flex-col justify-center items-center w-full max-w-2xl mx-auto border bg-white p-4'>
                                        <p>{careerObjective}</p>
                                    </div>
                                </> : <NoInformation setEdit={setEdit} edit={edit} />
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default CareerObjective;