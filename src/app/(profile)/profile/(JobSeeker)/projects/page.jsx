'use client'
import { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { IoMdAdd } from 'react-icons/io';
import { MdDeleteOutline } from 'react-icons/md';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import NoInformation from '@/components/shared/NoInformation';
import useSeekerInfo from '@/components/Hooks/useSeekerInfo';

const Projects = () => {
    const { data: session } = useSession();
    const [edit, setEdit] = useState(false);
    const {seekerInfo} = useSeekerInfo();
    // State for projects and activities
    const [projects, setProjects] = useState(seekerInfo?.projects);
    // Use useEffect to update the state when seekerInfo changes
    useEffect(() => {
        if (seekerInfo?.projects) {
            setProjects(seekerInfo.projects);
        }
    }, [seekerInfo]);
    // Handle project change
    const handleProjectChange = (index, field, value) => {
        const newProjects = [...projects];
        newProjects[index][field] = value;
        setProjects(newProjects);
    };

    // Add a new project
    const addProject = () => {
        if (projects) {
            setProjects([...projects, { projectName: "", projectLink: "", projectMadeWith: "", projectDetails: "" }]);
            return
        }
        setProjects([{ projectName: "", projectLink: "", projectMadeWith: "", projectDetails: "" }]);
    };

    // Remove a project
    const removeProject = (index) => {
        const newProjects = projects.filter((_, i) => i !== index);
        setProjects(newProjects);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/profile/api/${session.user.email}`, { projects });
            if (data?.upsertedId || data?.modifiedCount > 0) {
                toast.success("Updated Successful");
                setProjects(projects)
                setEdit(false);
            }
        } catch (err) {
            console.log(err?.message)
        }
    }

    return (
        <div className='relative border'>
            <button onClick={() => setEdit(!edit)} className="cursor-pointer absolute right-3 top-0 text-2xl">
                {edit ? <><IoCloseSharp /></> : <><FaRegEdit className={`${!projects && 'hidden'} cursor-pointer absolute right-3 top-0 text-2xl`} /></>}
            </button>
            <div>
                <h3 className="text-xl text-center font-semibold">Projects</h3>
                {
                    edit ?
                        <form onSubmit={handleSave}>
                            {/* Projects Section */}
                            <div className="mb-8">
                                {projects?.map((project, index) => (
                                    <div key={index} className="mb-4 border rounded-lg flex items-center">
                                        <div className='w-full'>
                                            <div className="mb-2">

                                                <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                    Project Name
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={project?.projectName}
                                                    onChange={(e) => handleProjectChange(index, 'projectName', e.target.value)}
                                                    className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                    placeholder="Project Name"
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                    Project Link
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={project?.projectLink}
                                                    onChange={(e) => handleProjectChange(index, 'projectLink', e.target.value)}
                                                    className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                    placeholder="Project Link"
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                    Project MadeWith
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={project?.projectMadeWith}
                                                    onChange={(e) => handleProjectChange(index, 'projectMadeWith', e.target.value)}
                                                    className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                    placeholder="Technologies used (e.g., React, Node.js)"
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                                    Project Details
                                                </label>
                                                <textarea
                                                    required
                                                    value={project?.projectDetails}
                                                    onChange={(e) => handleProjectChange(index, 'projectDetails', e.target.value)}
                                                    className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                    placeholder="Details about the project"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeProject(index)}
                                            className="text-red-500 text-4xl"
                                        >
                                            <MdDeleteOutline />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addProject}
                                    className="bg-hoverColor flex items-center gap-1 text-white py-2 px-4 rounded-lg mt-4"
                                >
                                    <IoMdAdd /> <span>Add Projects</span>
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
                                projects ? <>
                                    <div className='w-full max-w-2xl mx-auto border bg-white p-4'>
                                        {projects?.map((project, index) => (
                                            <div key={index} className='mt-5'>
                                                <h3>{project?.projectName}</h3>
                                                <p><strong>Link:</strong> <a href={project?.projectLink} target="_blank" rel="noreferrer">{project?.projectLink}</a></p>
                                                <p><strong>Made with:</strong> {project?.projectMadeWith}</p>
                                                <p>{project?.projectDetails}</p>
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

export default Projects;