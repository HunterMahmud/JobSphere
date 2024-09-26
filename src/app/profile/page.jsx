'use client'
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const profile = {
    "profileOverview": {
        "fullName": "John Doe",
        "profilePicture": "profile-picture.jpg",
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
    const [value, setValue] = React.useState(0);
    const width = false;
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='custom-container border-l-2'>
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', }}
                className="flex flex-col md:flex-row"
            >
                <Tabs
                    orientation={`${width ? 'horizontal' : 'vertical'}`}
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="Profile Overview" {...a11yProps(0)} className='capitalize' />
                    <Tab label="Personal Information" {...a11yProps(1)} className='capitalize' />
                    <Tab label="Career Objective" {...a11yProps(2)} className='capitalize' />
                    <Tab label="Skills" {...a11yProps(3)} className='capitalize' />
                    <Tab label="Work Experience" {...a11yProps(4)} className='capitalize' />
                    <Tab label="Education" {...a11yProps(5)} className='capitalize' />
                    <Tab label="Certifications" {...a11yProps(6)} className='capitalize' />
                </Tabs>
            </Box>
        </div>
    );
}
