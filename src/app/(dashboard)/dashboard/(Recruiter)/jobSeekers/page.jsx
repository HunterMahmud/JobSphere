"use client"

import SeekersCard from '@/components/JobSeekers/SeekersCard';
import React from 'react';
import { FaSearch } from 'react-icons/fa';

const page = () => {

    const jobSeekers = [
        {
            "profileOverview": {
                "fullName": "Tanvir Ahamed",
                "profilePicture": "https://i.ibb.co.com/WFk4dJ0/Tanvir.jpg",
                "address": "Kalindi Para",
                "city": "Munshiganj",
                "country": "Bangladesh",
                "wantJob": true,
                "preferredJobPosition": "Full Stack Developer",
                "preferredJobType": "Remote"
            },
            "socialProfiles": {
                "phoneNumber": "+1-555-1234-567",
                "emailAddress": "alice.johnson@example.com",
                "linkedinProfile": "https://linkedin.com/in/alicejohnson",
                "otherProfiles": {
                    "github": "https://github.com/tajtanvr1",
                    "portfolio": "https://aliceportfolio.com"
                }
            },
            "careerObjective": "Seeking a challenging position as a Full Stack Developer to utilize my experience in web technologies and cloud computing.",
            "projects": [
                {
                    "projectName": "E-commerce Platform",
                    "projectLink": "https://ecommerceplatform.com",
                    "projectMadeWith": ["React", "Node.js", "MySQL"],
                    "projectDetails": "Developed a scalable e-commerce platform for small businesses."
                }
            ],
            "skills": {
                "technicalSkills": ["React", "Node.js", "Express", "MySQL", "AWS"],
                "softSkills": ["Leadership", "Problem-solving", "Adaptability"]
            },
            "education": [
                {
                    "degreeName": "Bachelor of Science in Computer Science",
                    "instituteName": "MIT",
                    "cgpa": "3.9",
                    "passingYear": 2019
                }
            ],
            "workExperience": [
                {
                    "positionName": "Full Stack Developer",
                    "companyName": "Tech Solutions",
                    "startedDate": "2020-01-01",
                    "endingDate": "2023-09-01",
                    "stillWorking": false
                }
            ],
            "certifications": [
                {
                    "certificateName": "AWS Certified Developer",
                    "issuedBy": "Amazon Web Services",
                    "issueDate": "2021-11-15"
                }
            ],
            "extraCurricularActivities": [
                {
                    "activityName": "Volunteer Web Developer",
                    "description": "Built websites for local non-profit organizations."
                }
            ]
        },
        {
            "profileOverview": {
                "fullName": "Hasan Al Mahmud",
                "profilePicture": "https://i.ibb.co.com/54M49Z0/Hasan.jpg",
                "address": "789 Elm St",
                "city": "Los Angeles",
                "country": "Bangladesh",
                "wantJob": true,
                "preferredJobPosition": "UI/UX Designer",
                "preferredJobType": "Full-Time"
            },
            "socialProfiles": {
                "phoneNumber": "+1-555-9876-543",
                "emailAddress": "bob.martinez@example.com",
                "linkedinProfile": "https://linkedin.com/in/bobmartinez",
                "otherProfiles": {
                    "dribbble": "https://dribbble.com/bobmartinez",
                    "behance": "https://behance.net/bobmartinez"
                }
            },
            "careerObjective": "To apply my 4 years of experience in UI/UX design to create user-centered, innovative products.",
            "projects": [
                {
                    "projectName": "Mobile Banking App",
                    "projectLink": "https://mobilebankingapp.com",
                    "projectMadeWith": ["Figma", "Sketch"],
                    "projectDetails": "Designed a user-friendly interface for a mobile banking application."
                }
            ],
            "skills": {
                "technicalSkills": ["Figma", "Adobe XD", "Sketch", "HTML", "CSS"],
                "softSkills": ["Creativity", "Collaboration", "Communication"]
            },
            "education": [
                {
                    "degreeName": "Bachelor of Fine Arts in Graphic Design",
                    "instituteName": "California Institute of the Arts",
                    "cgpa": "3.7",
                    "passingYear": 2018
                }
            ],
            "workExperience": [
                {
                    "positionName": "UI/UX Designer",
                    "companyName": "Design Studio",
                    "startedDate": "2019-02-01",
                    "endingDate": "2023-06-01",
                    "stillWorking": false
                }
            ],
            "certifications": [
                {
                    "certificateName": "Certified UX Professional",
                    "issuedBy": "Interaction Design Foundation",
                    "issueDate": "2020-08-10"
                }
            ],
            "extraCurricularActivities": [
                {
                    "activityName": "Art Gallery Curator",
                    "description": "Curated digital art exhibitions at local galleries."
                }
            ]
        },
        {
            "profileOverview": {
                "fullName": "Rafizul Islam",
                "profilePicture": "https://i.ibb.co.com/FH7Yhb6/Rafizul.jpg",
                "address": "246 Maple St",
                "city": "Chicago",
                "country": "USA",
                "wantJob": true,
                "preferredJobPosition": "Backend Developer",
                "preferredJobType": "Contract"
            },
            "socialProfiles": {
                "phoneNumber": "+1-555-6543-210",
                "emailAddress": "carla.wong@example.com",
                "linkedinProfile": "https://linkedin.com/in/carlawong",
                "otherProfiles": {
                    "github": "https://github.com/carlawong"
                }
            },
            "careerObjective": "To secure a position as a Backend Developer where I can contribute my expertise in databases and APIs.",
            "projects": [
                {
                    "projectName": "API Management System",
                    "projectLink": "https://apimanagement.com",
                    "projectMadeWith": ["Node.js", "Express", "MongoDB"],
                    "projectDetails": "Developed an API management system for efficient data handling."
                }
            ],
            "skills": {
                "technicalSkills": ["Node.js", "Express", "MongoDB", "PostgreSQL", "Docker"],
                "softSkills": ["Analytical Thinking", "Time Management", "Problem-solving"]
            },
            "education": [
                {
                    "degreeName": "Master of Science in Computer Science",
                    "instituteName": "University of Chicago",
                    "cgpa": 3.4,
                    "passingYear": 2017
                }
            ],
            "workExperience": [
                {
                    "positionName": "Backend Developer",
                    "companyName": "WebWorks",
                    "startedDate": "2018-03-01",
                    "endingDate": "2023-05-01",
                    "stillWorking": false
                }
            ],
            "certifications": [
                {
                    "certificateName": "Certified Node.js Developer",
                    "issuedBy": "Node.js Academy",
                    "issueDate": "2019-09-12"
                }
            ],
            "extraCurricularActivities": [
                {
                    "activityName": "Open Source Contributor",
                    "description": "Contributed to various open source projects on GitHub."
                }
            ]
        },
        {
            "profileOverview": {
                "fullName": "Sahidul Islam",
                "profilePicture": "https://i.ibb.co.com/Ct6mM6L/Sahidul.jpg",
                "address": "135 Oak St",
                "city": "Seattle",
                "country": "USA",
                "wantJob": false,
                "preferredJobPosition": "DevOps Engineer",
                "preferredJobType": "Full-Time"
            },
            "socialProfiles": {
                "phoneNumber": "+1-555-3210-654",
                "emailAddress": "david.lee@example.com",
                "linkedinProfile": "https://linkedin.com/in/davidlee",
                "otherProfiles": {
                    "github": "https://github.com/davidlee",
                    "portfolio": "https://davidportfolio.com"
                }
            },
            "careerObjective": "Seeking a role as a DevOps Engineer to automate and improve infrastructure workflows.",
            "projects": [
                {
                    "projectName": "CI/CD Pipeline",
                    "projectLink": "https://cicdpipeline.com",
                    "projectMadeWith": ["Jenkins", "Docker", "Kubernetes"],
                    "projectDetails": "Automated a continuous integration and deployment pipeline for a cloud-based system."
                }
            ],
            "skills": {
                "technicalSkills": ["Jenkins", "Docker", "Kubernetes", "AWS", "Terraform"],
                "softSkills": ["Attention to Detail", "Project Management", "Leadership"]
            },
            "education": [
                {
                    "degreeName": "Bachelor of Science in Information Technology",
                    "instituteName": "University of Washington",
                    "cgpa": "3.6",
                    "passingYear": 2016
                }
            ],
            "workExperience": [
                {
                    "positionName": "DevOps Engineer",
                    "companyName": "CloudTech",
                    "startedDate": "2017-05-01",
                    "endingDate": "2024-02-01",
                    "stillWorking": true
                }
            ],
            "certifications": [
                {
                    "certificateName": "Certified Kubernetes Administrator",
                    "issuedBy": "CNCF",
                    "issueDate": "2022-04-20"
                }
            ],
            "extraCurricularActivities": [
                {
                    "activityName": "Tech Conference Speaker",
                    "description": "Delivered talks on DevOps practices at national tech conferences."
                }
            ]
        },
        {
            "profileOverview": {
                "fullName": "Shamim Islam",
                "profilePicture": "https://i.ibb.co.com/gz7jjtF/Shamim.jpg",
                "address": "678 Birch St",
                "city": "Austin",
                "country": "Bangladesh",
                "wantJob": true,
                "preferredJobPosition": "Data Scientist",
                "preferredJobType": "Remote"
            },
            "socialProfiles": {
                "phoneNumber": "+1-555-7654-321",
                "emailAddress": "evelyn.garcia@example.com",
                "linkedinProfile": "https://linkedin.com/in/evelyngarcia",
                "otherProfiles": {
                    "kaggle": "https://kaggle.com/evelyngarcia",
                    "github": "https://github.com/evelyngarcia"
                }
            },
            "careerObjective": "To apply my knowledge in data analysis and machine learning to deliver actionable insights and predictive models.",
            "projects": [
                {
                    "projectName": "Customer Churn Prediction",
                    "projectLink": "https://churnprediction.com",
                    "projectMadeWith": ["Python", "TensorFlow", "Pandas"],
                    "projectDetails": "Built a machine learning model to predict customer churn for a retail company."
                }
            ],
            "skills": {
                "technicalSkills": ["Python", "TensorFlow", "Pandas", "SQL", "R"],
                "softSkills": ["Critical Thinking", "Problem-solving", "Adaptability"]
            },
            "education": [
                {
                    "degreeName": "Master of Science in Data Science",
                    "instituteName": "University of Texas",
                    "cgpa": "3.8",
                    "passingYear": 2019
                }
            ],
            "workExperience": [
                {
                    "positionName": "Data Scientist",
                    "companyName": "Insight Analytics",
                    "startedDate": "2020-04-01",
                    "endingDate": "2023-12-01",
                    "stillWorking": true
                }
            ],
            "certifications": [
                {
                    "certificateName": "Certified Data Scientist",
                    "issuedBy": "DataCamp",
                    "issueDate": "2021-06-15"
                }
            ],
            "extraCurricularActivities": [
                {
                    "activityName": "Data Science Mentor",
                    "description": "Mentored aspiring data scientists through an online mentoring platform."
                }
            ]
        },
        {
            "profileOverview": {
                "fullName": "Tanvir Ahamed",
                "profilePicture": "https://i.ibb.co.com/WFk4dJ0/Tanvir.jpg",
                "address": "Kalindi Para",
                "city": "Munshiganj",
                "country": "Bangladesh",
                "wantJob": true,
                "preferredJobPosition": "Full Stack Developer",
                "preferredJobType": "Remote"
            },
            "socialProfiles": {
                "phoneNumber": "+1-555-1234-567",
                "emailAddress": "alice.johnson@example.com",
                "linkedinProfile": "https://linkedin.com/in/alicejohnson",
                "otherProfiles": {
                    "github": "https://github.com/tajanvr1",
                    "portfolio": "https://aliceportfolio.com"
                }
            },
            "careerObjective": "Seeking a challenging position as a Full Stack Developer to utilize my experience in web technologies and cloud computing.",
            "projects": [
                {
                    "projectName": "E-commerce Platform",
                    "projectLink": "https://ecommerceplatform.com",
                    "projectMadeWith": ["React", "Node.js", "MySQL"],
                    "projectDetails": "Developed a scalable e-commerce platform for small businesses."
                }
            ],
            "skills": {
                "technicalSkills": ["React", "Node.js", "Express", "MySQL", "AWS"],
                "softSkills": ["Leadership", "Problem-solving", "Adaptability"]
            },
            "education": [
                {
                    "degreeName": "Bachelor of Science in Computer Science",
                    "instituteName": "MIT",
                    "cgpa": "3.9",
                    "passingYear": 2019
                }
            ],
            "workExperience": [
                {
                    "positionName": "Full Stack Developer",
                    "companyName": "Tech Solutions",
                    "startedDate": "2020-01-01",
                    "endingDate": "2023-09-01",
                    "stillWorking": false
                }
            ],
            "certifications": [
                {
                    "certificateName": "AWS Certified Developer",
                    "issuedBy": "Amazon Web Services",
                    "issueDate": "2021-11-15"
                }
            ],
            "extraCurricularActivities": [
                {
                    "activityName": "Volunteer Web Developer",
                    "description": "Built websites for local non-profit organizations."
                }
            ]
        }
    ]

    return (
        <div className='my-8'>
            <h1 className="text-3xl font-bold text-center mb-8 underline">Job Seekers</h1>

            {/* Search Function */}
            <div className="flex items-center bg-white rounded-l-lg border-2 border-sky-500 w-[300px] mx-auto my-4 p-2">
                <FaSearch className="ml-3 text-gray-400" />
                <input
                  type="text"
                  className="w-[300px] p-2 text-sky-800 border-sky-600 border-none focus:outline-none"
                  placeholder="Search with Skill or Types"
                  value={""}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>

            {/* Job Seekers Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-around md:gap-16">
                {Array.isArray(jobSeekers) && jobSeekers.length > 0 ? (
                    jobSeekers.map((seekers, index) => <SeekersCard key={index} seekers={seekers} />)
                ) : (
                    <p className='text-xl text-center'>No Job Seekers found</p>
                )}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex flex-col md:flex-row  text-center gap-6 mx-auto max-w-[500px]">
                <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
                    Previous
                </button>
                <div className="space-x-2 flex mx-auto">
                    <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
                        1
                    </button>
                    <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
                        2
                    </button>
                    <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
                        3
                    </button>
                    <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
                        ...
                    </button>
                    <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
                        8
                    </button>
                </div>
                <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
                    Next
                </button>
            </div>
        </div>
    );
};

export default page;