'use client'
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { useSession } from 'next-auth/react';
import useProfileInfo from '@/components/Hooks/useProfileInfo';
import axios from 'axios';
import toast from 'react-hot-toast';

const ExtraCurricularActivity = () => {
    const { data: session } = useSession();
    const { profileInfo } = useProfileInfo();
    const [edit, setEdit] = useState(false);
    const [extraCurricularActivities, setExtraCurricularActivities] = useState(profileInfo?.extraCurricularActivities);

    useEffect(() => {
        if (profileInfo?.extraCurricularActivities) {
            setExtraCurricularActivities(profileInfo?.extraCurricularActivities)
        }
    }, [profileInfo])

    // Add a new activity
    const addActivity = () => {
        if (extraCurricularActivities) {
            setExtraCurricularActivities([...extraCurricularActivities, { activityName: "", description: "" }]);
            return
        }
        setExtraCurricularActivities([...extraCurricularActivities, { activityName: "", description: "" }]);
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
            const { data } = await axios.put(`http://localhost:3000/profile/api/${session.user.email}`, { extraCurricularActivities });
            if (data?.modifiedCount > 0) {
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
            <button onClick={() => setEdit(!edit)} className='cursor-pointer absolute right-3 top-0 text-2xl'>
                {edit ? <><IoCloseSharp /></> : <><FaRegEdit /></>}
            </button>
            <div>
                <h3 className="text-xl text-center font-semibold mb-2">Extra-Curricular Activities</h3>
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
                            <div className='flex flex-col gap-5 w-full max-w-2xl mx-auto border bg-white p-4'>
                                {extraCurricularActivities?.map((activity, index) => (
                                    <div>
                                        <p><strong>Activity Name : </strong>{activity.activityName}</p>
                                        <p><strong>Description : </strong>{activity.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                }

            </div>
        </div>
    );
};

export default ExtraCurricularActivity;