
'use client'
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { useState } from 'react';
import { WithContext as ReactTagInput } from 'react-tag-input';

const profile = {
    "profileOverview": {
        "fullName": "John Doe",
        "profilePicture": "https://i.ibb.co.com/Swccb1r/Customer-Satisfaction.png",
        "professionalTitle": "Frontend Developer",
        "location": "Dhaka, Bangladesh",
        "resumeLink": "/resume.pdf"
    },
    "personalInformation": {
        "email": "johndoe@example.com",
        "phoneNumber": "+880 123 456 789",
        "socialLinks": {
            "linkedin": "https://linkedin.com/in/johndoe",
            "github": "https://github.com/johndoe",
            "portfolio": "https://johndoe.com"
        }
    },
    "careerObjective": "Motivated Frontend Developer with 3 years of experience in building dynamic web applications using React.js and modern web technologies. Looking for a challenging role in a progressive organization where I can contribute to product development and growth.",
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
    "workExperience": [
        {
            "jobTitle": "Frontend Developer",
            "companyName": "ABC Company",
            "startDate": "Jan 2022",
            "endDate": "Present",
            "responsibilities": [
                "Developed and maintained scalable web applications using React.js, enhancing user engagement by 20%.",
                "Collaborated with cross-functional teams to design intuitive UI/UX solutions."
            ]
        }
    ],
    "education": [
        {
            "degree": "B.Sc. in Computer Science",
            "institution": "XYZ University",
            "startDate": "2018",
            "endDate": "2022",
            "fieldOfStudy": "Computer Science"
        }
    ],
    "certifications": [
        {
            "certificationName": "Google Cloud Certified",
            "issuingOrganization": "Google",
            "year": 2023
        },
        {
            "certificationName": "React.js Advanced Course",
            "issuingOrganization": "Udemy",
            "year": 2022
        }
    ],
    "projects": [
        {
            "projectName": "Job Search Platform",
            "description": "Developed a full-stack job portal application using React, Node.js, and MongoDB. Implemented user authentication, job listing, and search functionalities, contributing to a 30% increase in job placements."
        }
    ],
    "languages": [
        {
            "language": "English",
            "proficiency": "Fluent"
        },
        {
            "language": "Spanish",
            "proficiency": "Intermediate"
        },
        {
            "language": "Bengali",
            "proficiency": "Native"
        }
    ],
    "interests": [
        "Photography",
        "Open-source contributions",
        "Blogging",
        "Traveling"
    ]
}


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {
    const [edit, setEdit] = React.useState(false)
    const [value, setValue] = React.useState(0);
    // Define state for workExperience, education, and certifications
    const [workExperience, setWorkExperience] = useState([...profile.workExperience, { jobTitle: '', companyName: '', description: '' }]);
    const [education, setEducation] = useState([...profile.education, { degree: '', institution: '', description: '' }]);
    const [certifications, setCertifications] = useState([...profile.certifications, { certificationName: '', issuingOrganization: '', year: '' }])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // Define technical and soft skills
    const [skills, setSkills] = useState({
        technicalSkills: ["React.js", "Node.js", "JavaScript", "MongoDB", "HTML/CSS"],
        softSkills: ["Communication", "Teamwork", "Problem Solving"]
    });

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
    // -------------
    const handleAddWorkExperience = () => {
        setWorkExperience([...profile.workExperience, { jobTitle: '', companyName: '', startDate: '', endDate: '', responsibilities: '' }]);
    };

    const handleAddEducation = () => {
        setEducation([...profile.education, { degree: '', institution: '', startDate: '', endDate: '', fieldOfStudy: '' }]);
    };

    const handleAddCertification = () => {
        setCertifications([...profile.certifications, { certificationName: '', issuingOrganization: '', year: '' }]);
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const handleSave = async data => {
        const { } = data;
    }
    console.log(education)

    return (
        <div className='custom-container lg:w-[65%] border-l-2'>
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', }}
                className="flex flex-col md:flex-row relative mt-6 mb-24 md:my-6 "
            >
                <Tabs
                    orientation={'vertical'}
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                    className='min-w-[170px]'
                >
                    <Tab label="Profile Overview" {...a11yProps(0)} className='capitalize' />
                    <Tab label="Personal Information" {...a11yProps(1)} className='capitalize' />
                    <Tab label="Career Objective" {...a11yProps(2)} className='capitalize' />
                    <Tab label="Skills" {...a11yProps(3)} className='capitalize' />
                    <Tab label="Work Experience" {...a11yProps(4)} className='capitalize' />
                    <Tab label="Education" {...a11yProps(5)} className='capitalize' />
                    <Tab label="Certifications" {...a11yProps(6)} className='capitalize' />
                </Tabs>
                <div onClick={() => setEdit(!edit)} className='cursor-pointer absolute right-5 top- text-2xl font-semibold'>
                    {edit ? <><IoCloseSharp /></> : <><FaRegEdit /></>}
                </div>
                <form onSubmit={handleSubmit(handleSave)} className="space-y-6 w-full">
                    {/* Profile Overview */}
                    <TabPanel value={value} index={0}>
                        {!edit ? <>
                            <div className="max-w-3xl bg-white shadow-lg border rounded-lg p-8 mb-6">
                                <div className="flex  items-center space-x-4">
                                    <img
                                        src={profile?.profileOverview?.profilePicture}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full"
                                    />
                                    <div>
                                        <h2 className="text-2xl font-bold">{profile?.profileOverview?.fullName}</h2>
                                        <p className="text-gray-500">{profile?.profileOverview?.professionalTitle}</p>
                                        <p className="text-gray-400">{profile?.profileOverview?.location}</p>
                                    </div>
                                </div>
                            </div>
                        </> : <>
                            <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-5">
                                {/* Name */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                        Full Name
                                    </label>
                                    <input
                                        {...register("name")}
                                        defaultValue={profile.profileOverview.fullName}
                                        type="text"
                                        placeholder="Enter Your Name"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                {/* phoneNumber */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                        Professional Title
                                    </label>
                                    <input
                                        {...register("professionalTitle")}
                                        defaultValue={profile?.profileOverview?.professionalTitle}
                                        type="text"
                                        placeholder="Enter Your Professional Title"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                {/* Location */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                        Location
                                    </label>
                                    <input
                                        {...register("location")}
                                        defaultValue={profile?.profileOverview?.location}
                                        type="text"
                                        placeholder="Enter Your Location"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                {/* profilePicture */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                        Profile Picture
                                    </label>
                                    <input
                                        {...register("profilePicture")}
                                        type="file"
                                        id="image"
                                        name="image"
                                        accept="image/*"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>

                            </div>
                        </>}
                    </TabPanel>
                    {/* Personal Information */}
                    <TabPanel value={value} index={1}>
                        {edit ? <>
                            <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-5">
                                {/* Email */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                        Email
                                    </label>
                                    <input
                                        {...register("email")}
                                        defaultValue={profile.personalInformation.email}
                                        type="email"
                                        placeholder="Enter Your Email"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                {/* phoneNumber */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                        Phone Number
                                    </label>
                                    <input
                                        {...register("phoneNumber")}
                                        defaultValue={profile?.personalInformation?.phoneNumber}
                                        type="text"
                                        placeholder="Enter Your Phone Number"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                <div className='md:col-span-2'>
                                    <h1 className='font-medium'>Social Links</h1>
                                </div>
                                {/* linkedin */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                        Linkedin
                                    </label>
                                    <input
                                        {...register("linkedin")}
                                        defaultValue={profile.personalInformation.socialLinks.linkedin}
                                        type="text"
                                        placeholder="Enter Your linkedin account link"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                {/* github */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                        Github
                                    </label>
                                    <input
                                        {...register("github")}
                                        defaultValue={profile.personalInformation.socialLinks.github}
                                        type="text"
                                        placeholder="Enter Your github account link"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                {/* portfolio */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                        Portfolio
                                    </label>
                                    <input
                                        {...register("portfolio")}
                                        defaultValue={profile.personalInformation.socialLinks.portfolio}
                                        type="text"
                                        placeholder="Enter Your portfolio account link"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                            </div>
                        </> : <>
                            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 border mb-6">
                                <p><strong>Email:</strong> {profile.personalInformation.email}</p>
                                <p><strong>Phone Number:</strong> {profile.personalInformation.phoneNumber}</p>
                                <div className="mt-4">
                                    <a
                                        href={profile.personalInformation.socialLinks.linkedin}
                                        className="text-blue-500 hover:underline"
                                    >
                                        LinkedIn
                                    </a>{" "}
                                    |{" "}
                                    <a
                                        href={profile.personalInformation.socialLinks.github}
                                        className="text-blue-500 hover:underline"
                                    >
                                        GitHub
                                    </a>{" "}
                                    |{" "}
                                    <a
                                        href={profile.personalInformation.socialLinks.portfolio}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Portfolio
                                    </a>
                                </div>
                            </div>
                        </>}
                    </TabPanel>
                    {/* Career Objective */}
                    <TabPanel value={value} index={2} >
                        {edit ? <>
                            <div className='grid grid-cols-1 justify-center items-center'>
                                <div>
                                    <h3 className="text-xl text-center font-semibold mb-2">Career Objective</h3>
                                    <textarea
                                        {...register("careerObjective", {
                                            required: {
                                                value: true,
                                                message: "This field is required.",
                                            },
                                        })}
                                        defaultValue={profile.careerObjective}
                                        type="textarea"
                                        placeholder="Write your carrer objective"
                                        className="block w-full px-4 py-2 min-h-[150px] text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>

                            </div>
                        </> : <>
                            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 mb-6 border mt-2">
                                <h3 className="text-xl text-center font-semibold mb-4">Career Objective</h3>
                                <p>{profile.careerObjective}</p>
                            </div>
                        </>}
                    </TabPanel>
                    {/* Skills */}
                    <TabPanel value={value} index={3}>
                        {edit ? <>
                            <div className="min-h-screen bg-gray-100 md:p-6 flex flex-col items-center">
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
                                            tagInputField: 'outline-none text-gray-600',
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

                        </> : <>
                            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 mb-6">
                                <h3 className="text-xl font-semibold mb-4">Skills</h3>
                                <h4 className="font-semibold">Technical Skills:</h4>
                                <ul className="list-disc ml-6">
                                    {profile.skills.technicalSkills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                                <h4 className="font-semibold mt-4">Soft Skills:</h4>
                                <ul className="list-disc ml-6">
                                    {profile.skills.softSkills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        </>}

                    </TabPanel>
                    {/* Work Experience */}
                    <TabPanel value={value} index={4}>
                        {edit ? <>
                            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 mb-6">
                                <h3 className="text-xl font-semibold mb-4">Work Experience</h3>
                                {workExperience.map((experience, index) => (
                                    <div key={index} className="mb-6">
                                        <input
                                            type="text"
                                            placeholder="Job Title"
                                            defaultValue={experience.jobTitle}
                                            className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Company Name"
                                            defaultValue={experience.companyName}
                                            className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Company Name"
                                            defaultValue={experience.startDate}
                                            className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Company Name"
                                            defaultValue={experience.endDate}
                                            className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
                                        />
                                        <input
                                            key={index}
                                            type="text"
                                            placeholder="Job Title"
                                            defaultValue={experience.responsibilities}
                                            className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                ))}
                                <button
                                    onClick={handleAddWorkExperience}
                                    className="text-blue-600 font-bold"
                                >
                                    + Add Work Experience
                                </button>
                            </div>
                        </> : <>
                            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 mb-6">
                                <h3 className="text-xl font-semibold mb-4">Work Experience</h3>
                                {profile.workExperience.map((experience, index) => (
                                    <div key={index} className="mb-4">
                                        <h4 className="font-semibold">
                                            {experience.jobTitle} | {experience.companyName}
                                        </h4>
                                        <p>{experience.startDate} - {experience.endDate}</p>
                                        <ul className="list-disc ml-6">
                                            {experience.responsibilities?.map((responsibility, idx) => (
                                                <li key={idx}>{responsibility}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </>}

                    </TabPanel>
                    {/* Education */}
                    <TabPanel value={value} index={5}>
                        {
                            edit ? <>
                                <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 mb-6">
                                    <h3 className="text-xl font-semibold mb-4">Education</h3>
                                    {education?.map((edu, index) => (
                                        <div key={index} className="mb-6">
                                            <input
                                                type="text"
                                                placeholder="Degree"
                                                defaultValue={edu?.degree}
                                                className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Institution"
                                                defaultValue={edu?.institution}
                                                className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Institution"
                                                defaultValue={edu?.startDate}
                                                className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Institution"
                                                defaultValue={edu?.endDate}
                                                className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Institution"
                                                defaultValue={edu?.fieldOfStudy}
                                                className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
                                            />
                                        </div>
                                    ))}
                                    <button
                                        onClick={handleAddEducation}
                                        className="text-blue-600 font-bold"
                                    >
                                        + Add Education
                                    </button>
                                </div>
                            </> : <>
                                <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 mb-6">
                                    <h3 className="text-xl font-semibold mb-4">Education</h3>
                                    {profile.education?.map((edu, index) => (
                                        <div key={index}>
                                            <h4 className="font-semibold">{edu?.degree} | {edu?.institution}</h4>
                                            <p>{edu?.startDate} - {edu?.endDate}</p>
                                            <p>{edu?.fieldOfStudy}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        }

                    </TabPanel>
                    {/* Certifications */}
                    <TabPanel value={value} index={6}>
                        {edit ? <>
                            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 mb-6">
                                <h3 className="text-xl font-semibold mb-4">Certifications</h3>
                                {certifications?.map((cert, index) => (
                                    <div key={index} className="mb-6">
                                        <input
                                            type="text"
                                            placeholder="Certification Name"
                                            defaultValue={cert?.certificationName}
                                            className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Issuing Organization"
                                            defaultValue={cert?.issuingOrganization}
                                            className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Year"
                                            defaultValue={cert?.year}
                                            className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                ))}
                                <button
                                    onClick={handleAddCertification}
                                    className="text-blue-600 font-bold"
                                >
                                    + Add Certification
                                </button>
                            </div>
                        </> : <>
                            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 mb-6">
                                <h3 className="text-xl font-semibold mb-4">Certifications</h3>
                                <ul className="list-disc ml-6">
                                    {profile.certifications?.map((cert, index) => (
                                        <li key={index}>{cert?.certificationName} - {cert?.issuingOrganization} ({cert?.year})</li>
                                    ))}
                                </ul>
                            </div>
                        </>}

                    </TabPanel>

                    {/* Submit button */}
                    {
                        edit && <>
                            <div className='absolute right-3 md:bottom-0 '>
                                <div className='flex justify-end items-end'>
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-hoverColor px-5 rounded-md py-3 text-white"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </>
                    }
                </form>
            </Box>
        </div>
    );
}


