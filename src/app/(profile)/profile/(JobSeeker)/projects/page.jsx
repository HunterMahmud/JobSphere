'use client'
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { useForm } from "react-hook-form";
import { IoMdAdd } from 'react-icons/io';
import { MdDeleteOutline } from 'react-icons/md';

const Projects = () => {
    const [edit, setEdit] = React.useState(false);
    // State for projects and activities
    const [projects, setProjects] = React.useState([
        {
            projectName: "E-Commerce Website",
            projectLink: "https://ecommerce.com",
            projectMadeWith: "React.js, Node.js, MongoDB",
            projectDetails: "Developed a fully responsive e-commerce platform."
        }
    ]);

    // Handle project change
    const handleProjectChange = (index, field, value) => {
        const newProjects = [...projects];
        newProjects[index][field] = value;
        setProjects(newProjects);
    };

    // Add a new project
    const addProject = () => {
        setProjects([...projects, { projectName: "", projectLink: "", projectMadeWith: "", projectDetails: "" }]);
    };

    // Remove a project
    const removeProject = (index) => {
        const newProjects = projects.filter((_, i) => i !== index);
        setProjects(newProjects);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleSave = async () => {
        console.log('Hello')
    }

    return (
        <div className='relative border'>
            <button onClick={() => setEdit(!edit)} className='cursor-pointer absolute right-3 top-0 text-2xl'>
                {edit ? <><IoCloseSharp /></> : <><FaRegEdit /></>}
            </button>
            <div>
                <h3 className="text-xl text-center font-semibold">Projects</h3>
                {
                    edit ?
                        <form onSubmit={handleSubmit(handleSave)}>
                            {/* Projects Section */}
                            <div className="mb-8">
                                {projects.map((project, index) => (
                                    <div key={index} className="mb-4 border rounded-lg flex items-center">
                                        <div className='w-full'>
                                            <div className="mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Project</label>
                                                <input
                                                    type="text"
                                                    value={project.projectName}
                                                    onChange={(e) => handleProjectChange(index, 'projectName', e.target.value)}
                                                    className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                    placeholder="Project Name"
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <input
                                                    type="text"
                                                    value={project.projectLink}
                                                    onChange={(e) => handleProjectChange(index, 'projectLink', e.target.value)}
                                                    className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                    placeholder="Project Link"
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <input
                                                    type="text"
                                                    value={project.projectMadeWith}
                                                    onChange={(e) => handleProjectChange(index, 'projectMadeWith', e.target.value)}
                                                    className="block mt-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                                    placeholder="Technologies used (e.g., React, Node.js)"
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <textarea
                                                    value={project.projectDetails}
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
                                    <IoMdAdd /> <span>Add </span>
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
                                {projects.map((project, index) => (
                                    <div key={index}>
                                        <h3>{project.projectName}</h3>
                                        <p><strong>Link:</strong> <a href={project.projectLink} target="_blank" rel="noreferrer">{project.projectLink}</a></p>
                                        <p><strong>Made with:</strong> {project.projectMadeWith}</p>
                                        <p>{project.projectDetails}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                }

            </div>
        </div>
    );
};

export default Projects;