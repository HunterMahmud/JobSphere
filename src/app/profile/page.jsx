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
    const width = false;
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const handleRegister = async data => {
        const {
            name,
            email,
            cityName,
            education,
            mobileNumber,
            image,
            password,
            acceptTerms,
        } = data;
    }
    return (
        <div className='custom-container border-l-2'>
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', }}
                className="flex flex-col md:flex-row relative my-6"
            >
                <Tabs
                    orientation={`${width ? 'horizontal' : 'vertical'}`}
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
                <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">

                    <TabPanel value={value} index={0}>
                        {/* Profile Overview */}
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
                                {/* Professional Title */}
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
                                        {...register("locatiom")}
                                        defaultValue={profile.profileOverview.location}
                                        type="text"
                                        placeholder="Enter Your Name"
                                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
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

                            </div>
                        </>}
                    </TabPanel>

                    {/* Submit button */}
                    {
                        edit && <>
                            <div className='absolute right-3 bottom-0'>
                                <div className='flex justify-end items-end'>
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-hoverColor px-5 rounded-md py-3 text-white"
                                    >
                                        Register
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
