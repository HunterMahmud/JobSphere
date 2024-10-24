'use client'
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import NoInformation from '@/components/shared/NoInformation';
import useSeekerInfo from '@/components/Hooks/useSeekerInfo';

const ExtraCurricularActivity = () => {
    const { data: session } = useSession();
    const { seekerInfo } = useSeekerInfo();
    const [edit, setEdit] = useState(false);
    const [extraCurricularActivities, setExtraCurricularActivities] = useState(seekerInfo?.extraCurricularActivities);

    useEffect(() => {
        if (seekerInfo?.extraCurricularActivities) {
            setExtraCurricularActivities(seekerInfo?.extraCurricularActivities)
        }
    }, [seekerInfo])

    // Add a new activity
    const addActivity = () => {
        if (extraCurricularActivities) {
            setExtraCurricularActivities([...extraCurricularActivities, { activityName: "", description: "" }]);
            return
        }
        setExtraCurricularActivities([{ activityName: "", description: "" }]);
    };

    // Remove an activity
    const removeActivity = (index) => {
        const newActivities = extraCurricularActivities.filter((_, i) => i !== index);
        setExtraCurricularActivities(newActivities);
    };

    // Handle activity change
    const handleActivityChange = (index, field, value) => {
        const newActivities = [...extraCurricularActivities];
        newActivities[index][field] = value;
        setExtraCurricularActivities(newActivities);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/profile/api/${session.user.email}`, { extraCurricularActivities });
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
        <div className='relative border'>
            <button onClick={() => setEdit(!edit)} className="cursor-pointer absolute right-0 md:right-3 top-[3px] text-2xl">
                {edit ? <><IoCloseSharp /></> : <><FaRegEdit className={`${!extraCurricularActivities && 'hidden'}`} /></>}
            </button>
            <div>
                <h3 className="text-xl md:text-center font-semibold mb-5">Extra-Curricular <span className='hidden md:inline'>Activities</span></h3>
                {
                    edit ?
                        <form onSubmit={handleSave}>
                            {/* Extra-Curricular Activities Section */}
                            <div className="mb-8">
                                {extraCurricularActivities?.map((activity, index) => (
                                    <div key={index} className="border mt-2 rounded-lg shadow-sm">
                                        <div className='mb-6 flex items-center'>
                                            <div className='w-full'>
                                                <div className="mb-2">
                                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                        Activity Name
                                                    </label>
                                                    <input
                                                        required
                                                        type="text"
                                                        defaultValue={activity.activityName || ''}
                                                        onChange={(e) => handleActivityChange(index, 'activityName', e.target.value)}
                                                        className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                        placeholder="Activity Name"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                        Activity Description
                                                    </label>
                                                    <textarea
                                                        required
                                                        type="text"
                                                        defaultValue={activity.description || ''}
                                                        onChange={(e) => handleActivityChange(index, 'description', e.target.value)}
                                                        className="block w-full px-4 py-2 min-h-[150px] text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                        placeholder="Activity Description"
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeActivity(index)}
                                                className="text-red-500 text-4xl"
                                            >
                                                <MdDeleteOutline />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addActivity}
                                    className="bg-primary flex items-center gap-1 text-white py-2 px-4 rounded-lg mt-4"
                                >
                                    <IoMdAdd /> <span>Add Activity</span>
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
                        <div className='flex flex-col justify-center items-center w-full max-w-2xl mx-auto border bg-white p-4'>
                            {
                                extraCurricularActivities ? <>
                                    <div className='flex flex-col gap-5 w-full max-w-2xl mx-auto'>
                                        {extraCurricularActivities?.map((activity, index) => (
                                            <div key={index}>
                                                <p><strong>Activity Name : </strong>{activity.activityName}</p>
                                                <p><strong>Description : </strong>{activity.description}</p>
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

export default ExtraCurricularActivity;