'use client'
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { CgMoveRight } from 'react-icons/cg';
import useProfileInfo from '@/components/Hooks/useProfileInfo';
import toast from 'react-hot-toast';
import axios from 'axios';
import '@pathofdev/react-tag-input/build/index.css'; // Import styles for ReactTagInput
import ReactTagInput from '@pathofdev/react-tag-input';
import { useSession } from 'next-auth/react';
import NoInformation from '@/components/shared/NoInformation';

const Skills = () => {
    const { data: session } = useSession();
    const [edit, setEdit] = useState(false);
    const { profileInfo } = useProfileInfo();

    // Initialize technical and soft skills with fallback values to avoid undefined errors
    const [skills, setSkills] = useState(profileInfo?.skills || { technicalSkills: [], softSkills: [] });
    // Use useEffect to update the state when profileInfo changes
    useEffect(() => {
        if (profileInfo?.skills) {
            setSkills(profileInfo?.skills);
        }
    }, [profileInfo]);

    // Handle technical skill changes
    const handleTechnicalSkillsChange = (newSkills) => {
        setSkills(prevSkills => ({
            ...prevSkills,
            technicalSkills: newSkills
        }));
    };

    // Handle soft skill changes
    const handleSoftSkillsChange = (newSkills) => {
        setSkills(prevSkills => ({
            ...prevSkills,
            softSkills: newSkills
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`http://localhost:3000/profile/api/${session.user.email}`, { skills });
            if (data?.modifiedCount > 0) {
                toast.success("Updated Successfully");
                setSkills(skills)
                setEdit(false);
            }
        } catch (err) {
            console.log(err?.message);
        }
    };

    return (
        <div className='relative border'>
            <button onClick={() => setEdit(!edit)} className="cursor-pointer absolute right-3 top-0 text-2xl">
                {edit ? <><IoCloseSharp /></> : <><FaRegEdit className={`${!skills && 'hidden'} cursor-pointer absolute right-3 top-0 text-2xl`} /></>}
            </button>
            <div>
                <h3 className="text-xl text-center font-semibold">Skills</h3>
                {
                    edit ? (
                        <form onSubmit={handleSave}>
                            <div className="md:p-6 flex flex-col items-center">
                                <div className="max-w-4xl w-full mx-auto p-6 bg-white shadow-md rounded-md">
                                    {/* Technical Skills */}
                                    <div className="mb-6">
                                        <h2 className="text-xl font-semibold mb-2">Technical Skills</h2>
                                        <ReactTagInput
                                            tags={skills.technicalSkills}
                                            onChange={handleTechnicalSkillsChange}
                                            placeholder="Add new technical skill"
                                            className="tag-input"
                                        />
                                    </div>

                                    {/* Soft Skills */}
                                    <div>
                                        <h2 className="text-xl font-semibold mb-2">Soft Skills</h2>
                                        <ReactTagInput
                                            tags={skills.softSkills}
                                            onChange={handleSoftSkillsChange}
                                            placeholder="Add new soft skill"
                                            className="tag-input"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-2'>
                                <div className='flex justify-end items-end'>
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-hoverColor px-5 rounded-md py-3 text-white"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className='mt-5 flex flex-col justify-center items-center w-full max-w-2xl mx-auto border bg-white p-4'>
                            {
                                skills?.technicalSkills.length > 0 || skills?.softSkills.length > 0 ? <>
                                    <div className='flex flex-col md:flex-row justify-center items-start gap-3 md:gap-10 w-full max-w-2xl mx-auto border bg-white p-4'>
                                        <div>
                                            <h4 className="font-semibold">Technical Skills:</h4>
                                            {skills?.technicalSkills?.length ? (
                                                skills.technicalSkills.map((skill, index) => (
                                                    <div key={index} className='flex items-center gap-1'>
                                                        <CgMoveRight className='text-xl md:text-2xl' />
                                                        <p>{skill}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No technical skills added</p>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Soft Skills:</h4>
                                            {skills?.softSkills?.length ? (
                                                skills.softSkills.map((skill, index) => (
                                                    <div key={index} className='flex items-center gap-1'>
                                                        <CgMoveRight className='text-xl md:text-2xl' />
                                                        <p>{skill}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No soft skills added</p>
                                            )}
                                        </div>
                                    </div>
                                </> : <NoInformation setEdit={setEdit} edit={edit} />
                            }

                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Skills;
