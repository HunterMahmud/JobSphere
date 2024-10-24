'use client'
import React, { useEffect, useState } from "react";
import axios from "axios"; // Assuming you have a Loader component for loading state
import Loader from "@/app/loading";
import Image from "next/image";
import { CgMoveRight } from "react-icons/cg";
import { MdOutlineBrowserUpdated, MdOutlineMail } from "react-icons/md";
import { FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";

const ProfilePage = ({ params }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    const { contactInformation, profileOverview, skills, certifications, extraCurricularActivities, careerObjective, projects, education, workExperience } = user

    useEffect(() => {
        const fetchInfo = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/profile/api/${params.email}`
                );
                setUser(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Error fetching data: ", error.message);
            }
        };
        fetchInfo();
    }, [params]);


    if (loading) return <Loader />;

    return (
        <div className="min-h-screen mt-5 custom-container">
            <div className="flex flex-col md:flex-row">
                {/* Profile Header */}
                {profileOverview && (
                    <div className="bg-white shadow-md rounded-lg p-4 mb-6 border">
                        <div className="flex flex-1 items-center space-x-4">
                            <Image
                                src={profileOverview?.profilePicture || "https://i1.sndcdn.com/artworks-000189080723-ez2uad-t500x500.jpg"}
                                alt="Profile"
                                className="w-24 h-24 rounded-full"
                                width={500}
                                height={500}
                            />
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold">{profileOverview?.fullName}</h2>
                                {profileOverview?.preferredJobPosition && (
                                    <p className="text-gray-600">{profileOverview?.preferredJobPosition}</p>
                                )}
                                {profileOverview?.address && (
                                    <p className="text-gray-600">
                                        {profileOverview?.address}, {profileOverview?.city}, {profileOverview?.country}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Contact Information */}
                {(contactInformation?.email || contactInformation?.phoneNumber || socialLinks) && (
                    <div className="bg-white md:w-[300px] shadow-md rounded-lg p-4 mb-6 border">
                        <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
                        {contactInformation?.email && <p className="flex items-center  gap-2"><p><MdOutlineMail /> </p> {contactInformation?.email}</p>}
                        {contactInformation?.phoneNumber && <p className="flex items-center  gap-2"><p><FaPhoneAlt /> </p> {contactInformation?.phoneNumber}</p>}
                        <div className="flex justify-center items-center mt-2 gap-3">
                            {contactInformation?.socialLinks?.linkedin && <p><a target="_blank" href={contactInformation?.socialLinks?.linkedin} className="text-xl hover:text-primary"><FaLinkedinIn /> </a></p>}
                            {contactInformation?.socialLinks?.github && <p><a target="_blank" href={contactInformation?.socialLinks?.github} className="text-xl hover:text-primary"><IoLogoGithub /> </a></p>}
                            {contactInformation?.socialLinks?.portfolio && <p> <a target="_blank" href={contactInformation?.socialLinks?.portfolio} className="text-xl hover:text-primary"><MdOutlineBrowserUpdated /></a></p>}
                        </div>
                    </div>
                )}
            </div>

            {/* Career Objective */}
            {careerObjective && (
                <div className="bg-white shadow-md rounded-lg p-4 mb-6 border">
                    <h2 className="text-xl font-semibold mt-6">Career Objective:</h2>
                    <p>{careerObjective}</p>
                </div>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
                <div className="bg-white shadow-md rounded-lg p-4 mb-6 border">
                    <h3 className="text-xl font-semibold mb-2">Projects</h3>
                    <div>
                        {projects.map((project, index) => (
                            <div key={index}>
                                <div className='flex items-center gap-1'>
                                    <CgMoveRight className='text-xl md:text-2xl hidden md:block' />
                                    <strong>{project?.projectName}:</strong>{" "}
                                </div>
                                <a target="_blank" href={project?.projectLink} className="text-hover font-medium">
                                    Project Link
                                </a>{" "}
                                - Made with {project?.projectMadeWith}
                                <p className="text-gray-700">{project?.projectDetails}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {(skills?.technicalSkills?.length > 0 || skills?.softSkills?.length > 0) && (
                <div className="bg-white shadow-md rounded-lg p-4 mb-6 border">
                    <h3 className="text-xl font-semibold mb-2">Skills</h3>
                    <div className="flex space-x-8">
                        {skills?.technicalSkills?.length > 0 && (
                            <div>
                                <h4 className="font-semibold">Technical Skills</h4>
                                <ul className="list-decimal list-inside">
                                    {skills?.technicalSkills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {skills?.softSkills?.length > 0 && (
                            <div>
                                <h4 className="font-semibold">Soft Skills</h4>
                                <ul className="list-decimal list-inside">
                                    {skills?.softSkills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <div className="bg-white shadow-md rounded-lg p-4 mb-6 border">
                    <h3 className="text-xl font-semibold mb-2">Education</h3>
                    {education.map((edu, index) => (
                        <p key={index} className='flex items-center gap-1'>
                            <CgMoveRight className='text-xl md:text-2xl hidden md:block' />
                            <strong>{edu?.degreeName}:</strong> {edu?.instituteName} (CGPA:{" "}
                            {edu?.cgpa}) - Passing Year: {edu?.passingYear}
                        </p>
                    ))}
                </div>
            )}

            {/* Work Experience */}
            {workExperience && workExperience.length > 0 && (
                <div className="bg-white shadow-md rounded-lg p-4 mb-6 border">
                    <h3 className="text-xl font-semibold mb-2">Work Experience</h3>
                    {workExperience.map((experience, index) => (
                        <div key={index}>
                            <p>
                                <strong>{experience?.jobTitle}:</strong> {experience?.companyName} (
                                {experience?.startDate} to {experience?.endDate})
                            </p>
                            <p className="text-gray-700">Responsibilities: {experience?.responsibilities}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
                <div className="bg-white shadow-md rounded-lg p-4 mb-6 border">
                    <h3 className="text-xl font-semibold mb-2">Certifications</h3>
                    {certifications.map((certification, index) => (
                        <p key={index} className='flex items-center gap-1'>
                            <CgMoveRight className='text-xl md:text-2xl' />
                            <strong>{certification?.certificationName}:</strong>{" "}
                            {certification?.issuingOrganization} ({certification?.year})
                        </p>
                    ))}
                </div>
            )}

            {/* Extra-Curricular Activities */}
            {user?.extraCurricularActivities && user?.extraCurricularActivities.length > 0 && (
                <div className="bg-white shadow-md rounded-lg p-4 mb-6 border">
                    <h3 className="text-xl font-semibold mb-2">Extra-Curricular Activities</h3>
                    <div>
                        {user.extraCurricularActivities.map((activity, index) => (
                            <p key={index} className='flex items-center gap-1'>
                                <CgMoveRight className='text-xl md:text-2xl' />
                                <strong>{activity?.activityName}</strong>: {activity?.description}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
