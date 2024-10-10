

const ResumePDF = ({ user }) => {


    // const user = [
    //     {
    //         profileOverview: {
    //             fullName: "John Doe",
    //             profilePicture: "https://i.ibb.co.com/qDfgZ7r/pexels-rezwan-1145434.jpg",
    //             address: "1234 Elm St",
    //             city: "San Francisco",
    //             country: "USA",
    //             wantJob: true,
    //             preferredJobPosition: "Frontend Developer",
    //             preferredJobType: "Full-Time"
    //         }
    //     },
    //     {
    //         socialProfiles: {
    //             phoneNumber: "+1-234-567-8900",
    //             emailAddress: "johndoe@example.com",
    //             linkedinProfile: "https://linkedin.com/in/johndoe",
    //             otherProfiles: {
    //                 github: "https://github.com/johndoe",
    //                 portfolio: "https://johndoe.com"
    //             }
    //         }
    //     },
    //     {
    //         careerObjective: "Passionate developer looking to leverage 5 years of experience in web development to build innovative applications."
    //     },
    //     {
    //         projects: [
    //             {
    //                 projectName: "Tourism Kingdom",
    //                 projectLink: "https://tourismkingdom.com",
    //                 projectMadeWith: ["React", "Node.js", "MongoDB"],
    //                 projectDetails: "A web platform for adding and exploring tourist places."
    //             },
    //             {
    //                 projectName: "Job Sphere",
    //                 projectLink: "https://jobsphere.com",
    //                 projectMadeWith: ["Next.js", "Tailwind CSS", "Firebase"],
    //                 projectDetails: "A job hiring platform for employers and job seekers."
    //             }
    //         ]
    //     },
    //     {
    //         skills: {
    //             technicalSkills: [
    //                 "JavaScript",
    //                 "React",
    //                 "Next.js",
    //                 "Node.js",
    //                 "MongoDB"
    //             ],
    //             softSkills: [
    //                 "Communication",
    //                 "Problem-solving",
    //                 "Teamwork"
    //             ]
    //         }
    //     },
    //     {
    //         education: [
    //             {
    //                 degreeName: "Bachelor of Science in Computer Science",
    //                 instituteName: "Stanford University",
    //                 cgpa: "3.8",
    //                 passingYear: 2020
    //             }
    //         ]
    //     },
    //     {
    //         workExperience: [
    //             {
    //                 positionName: "Frontend Developer",
    //                 companyName: "Innovative Coders",
    //                 startedDate: "2021-06-01",
    //                 endingDate: "2024-09-01",
    //                 stillWorking: false
    //             }
    //         ]
    //     },
    //     {
    //         certifications: [
    //             {
    //                 certificateName: "Certified JavaScript Developer",
    //                 issuedBy: "JS Academy",
    //                 issueDate: "2022-05-01"
    //             }
    //         ]
    //     },
    //     {
    //         extraCurricularActivities: [
    //             {
    //                 activityName: "Hackathon Winner",
    //                 description: "Won 1st place at a national hackathon for building a web app."
    //             }
    //         ]
    //     }
    // ];
    return (
        <div className="overflow-x-scroll">
            <div id="resume" className="p-4 md:p-10 lg:p-16 border rounded shadow-md bg-white">
                <h1 className="text-3xl font-bold mb-4 text-center">
                    {user?.profileOverview?.fullName || " "} Resume
                </h1>

                <div className="flex items-center mb-4">
                    <img
                        src={user?.profileOverview?.profilePicture || "https://i1.sndcdn.com/artworks-000189080723-ez2uad-t500x500.jpg"}
                        alt="Profile"
                        className="w-28 h-28 rounded-full mr-4"
                    />
                    <div>
                        <h2 className="text-2xl">
                            {user?.profileOverview?.fullName || "N/A"}
                        </h2>
                        <p className="text-gray-600">
                            {user?.profileOverview?.address}, {user?.profileOverview?.city}, {user?.profileOverview?.country}
                        </p>
                        <p className="text-gray-600">
                            Phone: {user?.personalInformation?.phoneNumber}
                        </p>
                        <p className="text-gray-600">
                            Email: {user?.personalInformation?.email}
                        </p>
                        <p className="text-gray-600">
                            LinkedIn:{" "}
                            <a target='_blank' href={user?.personalInformation?.socialLinks?.linkedin} className="text-blue-600 underline">
                               Link here
                            </a>
                        </p>
                        <p className="text-gray-600">
                            GitHub:{" "}
                            <a target='_blank' href={user?.personalInformation?.socialLinks?.github} className="text-blue-600 underline">
                            Link here
                            </a>
                        </p>
                        <p className="text-gray-600">
                            Portfolio:{" "}
                            <a target='_blank' href={user?.personalInformation?.socialLinks?.portfolio} className="text-blue-600 underline">
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