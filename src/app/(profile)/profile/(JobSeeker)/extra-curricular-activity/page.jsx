'use client'
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { CgMoveRight } from "react-icons/cg";

const ExtraCurricularActivity = () => {
    const [edit, setEdit] = React.useState(false);
    const [activities, setActivities] = React.useState([
        { activity: "Volunteer at XYZ Organization" }
    ]);

    // Add a new activity
    const addActivity = () => {
        setActivities([...activities, { activity: "" }]);
    };

    // Remove an activity
    const removeActivity = (index) => {
        const newActivities = activities.filter((_, i) => i !== index);
        setActivities(newActivities);
    };

    // Handle activity change
    const handleActivityChange = (index, value) => {
        const newActivities = [...activities];
        newActivities[index].activity = value;
        setActivities(newActivities);
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
                <h3 className="text-xl text-center font-semibold mb-2">Extra-Curricular Activities</h3>
                {
                    edit ?
                        <form onSubmit={handleSave}>
                            {/* Extra-Curricular Activities Section */}
                            <div className="mb-8">
                                {activities.map((activity, index) => (
                                    <div key={index} className="border mt-2 rounded-lg shadow-sm">
                                        <label className="block text-sm font-medium text-gray-700">Activity</label>
                                        <div className='flex'>
                                            <input
                                                type="text"
                                                value={activity.activity}
                                                onChange={(e) => handleActivityChange(index, e.target.value)}
                                                className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                placeholder="Activity Name"
                                            />

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
                            <div className='flex flex-col justify-center items-center w-full max-w-2xl mx-auto border bg-white p-4'>
                                {activities?.map((activity, index) => (
                                    <div key={index} className='flex items-center gap-1'>
                                        <CgMoveRight className='text-xl md:text-2xl' />
                                        <p>{activity.activity}</p>
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