import Image from "next/image";


const ResumePDF = ({ user }) => {
    return (
        <div className="">
            <div id="resume" className="">
                
                <div className="flex items-center mb-4">
                    <Image height={500} width={500}
                        src={user?.profileOverview?.profilePicture || "https://i1.sndcdn.com/artworks-000189080723-ez2uad-t500x500.jpg"}
                        alt="Profile"
                        className="w-28 h-28 rounded-full mr-4"
                    />
                    <div>
                        <h2 className="text-3xl font-bold">
                            {user?.profileOverview?.fullName || "N/A"}
                        </h2>
                        <p className="text-gray-600">
                            {user?.profileOverview?.address}, {user?.profileOverview?.city}, {user?.profileOverview?.country}
                        </p>
                        <p className="text-gray-600">
                            Phone: {user?.contactInformation?.phoneNumber}
                        </p>
                        <p className="text-gray-600">
                            Email: {user?.contactInformation?.email}
                        </p>
                        <p className="text-gray-600">
                            LinkedIn:{" "}
                            <a target='_blank' href={user?.contactInformation?.socialLinks?.linkedin} className="text-blue-600 underline">
                               Link here
                            </a>
                        </p>
                        <p className="text-gray-600">
                            GitHub:{" "}
                            <a target='_blank' href={user?.contactInformation?.socialLinks?.github} className="text-blue-600 underline">
                            Link here
                            </a>
                        </p>
                        <p className="text-gray-600">
                            Portfolio:{" "}
                            <a target='_blank' href={user?.contactInformation?.socialLinks?.portfolio} className="text-blue-600 underline">
                            Link here
                            </a>
                        </p>
                    </div>
                </div>

                <h2 className="text-xl font-semibold mt-6">Career Objective :</h2>
                <p>{user?.careerObjective}</p>

                <h2 className="text-xl font-semibold mt-6">Projects :</h2>
                {user?.projects?.map((project, index) => (
                    <div key={index} className="mb-2">
                        <h3 className="font-bold">{project?.projectName}</h3>
                        <p>
                            <strong>Link:</strong>{" "}
                            <a target='_blank' href={project?.projectLink} className="text-blue-600 underline">
                                {project?.projectLink}
                            </a>
                        </p>
                        <p>{project?.projectDetails}</p>
                    </div>
                ))}

                <h2 className="text-xl font-semibold mt-6">Skills :</h2>
                <p>
                    <strong>Technical:</strong>{" "}
                    <span>{user?.skills?.technicalSkills?.join(", ")}</span>
                </p>
                <p>
                    <strong>Soft Skills:</strong>{" "}
                    {user?.skills?.softSkills?.join(", ")}
                </p>

                <h2 className="text-xl font-semibold mt-6">Education</h2>
                {user?.education?.map((edu, index) => (
                    <p key={index}>
                        {edu?.degreeName} from {edu?.instituteName} ({edu?.passingYear}, CGPA: {edu?.cgpa})
                    </p>
                ))}

                <h2 className="text-xl font-semibold mt-6">Work Experience</h2>
                {user?.workExperience?.map((work, index) => (
                    <p key={index}>
                        {work?.jobTitle} at {work?.companyName} ({work?.startDate} - {work?.endDate})
                    </p>
                ))}

                <h2 className="text-xl font-semibold mt-6">Certifications</h2>
                {user?.certifications?.map((cert, index) => (
                    <p key={index}>
                        {cert?.certificationName} issued by {cert?.issuingOrganization} in {cert?.year}
                    </p>
                ))}

                <h2 className="text-xl font-semibold mt-6">Extra Curricular Activities</h2>
                {user?.extraCurricularActivities?.map((activity, index) => (
                    <p key={index}>
                        {activity?.activityName}: {activity?.description}
                    </p>
                ))}
            </div>
        </div>


    );
};

export default ResumePDF;