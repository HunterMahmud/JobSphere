'use client'
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { WithContext as ReactTagInput } from 'react-tag-input';
import { CgMoveRight } from 'react-icons/cg';

const profile = {
    "skills": {
        "technicalSkills": [
            "React.js",
            "Node.js",
            "JavaScript",
            "MongoDB",
            "RESTful APIs",
            "HTML/CSS"
        ],
        "softSkills": [
            "Communication",
            "Teamwork",
            "Problem Solving"
        ]
    },
}
const Skills = () => {
    const [edit, setEdit] = React.useState(false);

    // Define technical and soft skills
    const [skills, setSkills] = React.useState({ ...profile.skills });

    const handleSkillDelete = (i, type) => {
        setSkills({
            ...skills,
            [type]: skills[type].filter((_, index) => index !== i)
        });
    };

    const handleSkillAddition = (tag, type) => {
        setSkills({
            ...skills,
            [type]: [...skills[type], tag.text]
        });
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
                <h3 className="text-xl text-center font-semibold">Skills</h3>
                {
                    edit ?
                        <form onSubmit={handleSave}>
                            <div className="min-h-screen md:p-6 flex flex-col items-center">
                                {/* Technical Skills */}
                                <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 mb-6">
                                    <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
                                    <ReactTagInput
                                        tags={skills.technicalSkills.map(skill => ({ id: skill, text: skill }))}
                                        handleDelete={(i) => handleSkillDelete(i, 'technicalSkills')}
                                        handleAddition={(tag) => handleSkillAddition(tag, 'technicalSkills')}
                                        inputFieldPosition="bottom"
                                        placeholder="Add a new technical skill"
                                        classNames={{
                                            tags: 'flex flex-wrap gap-2 mt-4',
                                            tag: 'bg-gray-200 px-3 py-1 rounded-lg text-black flex items-center',
                                            tagInput: 'border border-gray-300 rounded-lg p-2 w-full',
                                            tagInputField: 'outline-none  text-gray-600',
                                            remove: 'ml-2 text-blue-900 cursor-pointer'
                                        }}
                                    />
                                </div>

                                {/* Soft Skills */}
                                <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 mb-6">
                                    <h3 className="text-xl font-semibold mb-4">Soft Skills</h3>
                                    <ReactTagInput
                                        tags={skills.softSkills.map(skill => ({ id: skill, text: skill }))}
                                        handleDelete={(i) => handleSkillDelete(i, 'softSkills')}
                                        handleAddition={(tag) => handleSkillAddition(tag, 'softSkills')}
                                        inputFieldPosition="bottom"
                                        placeholder="Add a new soft skill"
                                        classNames={{
                                            tags: 'flex flex-wrap gap-2 mt-4',
                                            tag: 'bg-gray-200 px-3 py-1 rounded-lg text-black flex items-center',
                                            tagInput: 'border border-gray-300 rounded-lg p-2 w-full',
                                            tagInputField: 'outline-none text-gray-600',
                                            remove: 'ml-2 text-blue-900 cursor-pointer'
                                        }}
                                    />
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
                        <div className='mt-5'>
                            <div className='flex flex-col md:flex-row justify-center items-start gap-3 md:gap-10 w-full max-w-2xl mx-auto border bg-white p-4'>
                                <div>
                                    <h4 className="font-semibold">Technical Skills:</h4>
                                    {skills.technicalSkills.map((skill, index) => (
                                        <div key={index} className='flex items-center gap-1'>
                                            <CgMoveRight className='text-xl md:text-2xl' />
                                            <p key={index}>{skill}</p>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <h4 className="font-semibold">Soft Skills:</h4>
                                    {skills.softSkills.map((skill, index) => (
                                        <div key={index} className='flex items-center gap-1'>
                                            <CgMoveRight className='text-xl md:text-2xl' />
                                            <p key={index}>{skill}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                }

            </div>
        </div>
    );
};

export default Skills;