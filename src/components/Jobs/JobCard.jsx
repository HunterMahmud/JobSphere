import Link from "next/link";
import React from "react";

const JobCard = ({ job }) => {
  const {
    _id,
    postedDate,
    deadline,
    skills,
  } = job;
  console.log(job);
  return (
    <div>
      <div className="card bg-blue-100 shadow-2xl p-6 rounded-xl border-l-4 border-slate-800 flex flex-col justify-between hover:border-2 hover:border-sky-500 box-border h-[350px]">
        <div className="card-body">
          <h2 className="card-title text-xl font-semibold animate-pulse">
            {job.summary.jobTitle}
          </h2>
          <p className="text-gray-700 font-medium">
            {job.companyDetails.companyName}
          </p>
          <div className="text-gray-600 mt-2">
            <p>
              <span className="font-bold">Job Type:</span>{" "}
              {job.companyDetails.type}
            </p>
            <p>
              <span className="font-bold">Experience Need:</span>{" "}
              {job.requirement.experience}
            </p>
            <p>
              <span className="font-bold">Posted Date:</span> {postedDate}
            </p>
            <p>
              <span className="font-bold">Deadline:</span> {deadline}
            </p>
          </div>
          <div className="mt-4">
            <p className="font-bold">Skill need:</p>
            <div className="space-x-2 mt-2 flex flex-wrap gap-1">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-outline  badge-primary bg-blue-200 px-3 rounded-lg border-2 border-blue-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <button className="bg-purple-600 btn hover:bg-purple-700 text-white   font-semibold py-2 px-6 rounded-lg w-auto">
            <Link href={`/jobs/${_id}`}>View Details</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;

const jobs = [
  {
    summary: {
      jobTitle: "Frontend Developer",
      vacancy: 5,
      location: "Remote",
      jobType: "Remote",
      salaryScale: "$70,000 - $90,000",
      experienceNeed: "2 Years",
    },
    requirement: {
      education: "Bachelor's Degree in Computer Science or related field",
      experience: "2 Years",
      additionalRequirements: "Proficiency in React and Tailwind CSS.",
      responsibility:
        "Designing and implementing user interfaces for web applications.",
      benefits: "Health insurance, flexible hours.",
    },
    companyDetails: {
      companyName: "Tech Solutions Inc.",
      type: "Private",
      headOffice: "123 Tech Ave, New York, NY",
      workArea: "Web Development",
      contact: {
        mobileNo: "+1 (123) 456-7890",
        email: "info@techsolutions.com",
        website: "www.techsolutions.com",
      },
    },
    applyProcess: {
      needToDoForApply: "Submit your resume and portfolio through our website.",
      others: "Include links to GitHub and relevant projects.",
    },
    postedDate: "21 Sept 2024",
    deadline: "30 Sept 2024",
    skills: ["React", "Tailwind CSS"],
  },
  {
    summary: {
      jobTitle: "Full Stack Developer",
      vacancy: 3,
      location: "Remote",
      jobType: "Remote",
      salaryScale: "$80,000 - $100,000",
      experienceNeed: "3 Years",
    },
    requirement: {
      education: "Master's Degree in Computer Science or related field",
      experience: "3 Years",
      additionalRequirements: "Experience with Node.js, Express, and MongoDB.",
      responsibility: "Building and maintaining web applications and services.",
      benefits: "401(k) matching, paid time off.",
    },
    companyDetails: {
      companyName: "InnovateX",
      type: "Private",
      headOffice: "456 Innovate Lane, San Francisco, CA",
      workArea: "Software Development",
      contact: {
        mobileNo: "+1 (987) 654-3210",
        email: "info@innovatex.com",
        website: "www.innovatex.com",
      },
    },
    applyProcess: {
      needToDoForApply: "Email your resume and cover letter to our HR.",
      others: "Include links to your portfolio and relevant projects.",
    },
    postedDate: "20 Sept 2024",
    deadline: "29 Sept 2024",
    skills: ["Node.js", "Express", "MongoDB"],
  },
  {
    summary: {
      jobTitle: "UI/UX Designer",
      vacancy: 4,
      location: "Remote",
      jobType: "Remote",
      salaryScale: "$60,000 - $80,000",
      experienceNeed: "1 Year",
    },
    requirement: {
      education: "Graduation in Design or related field",
      experience: "1 Year",
      additionalRequirements:
        "Familiarity with design tools like Figma and Adobe XD.",
      responsibility: "Creating user-friendly designs and prototypes.",
      benefits: "Flexible work environment.",
    },
    companyDetails: {
      companyName: "Creative Minds",
      type: "Private",
      headOffice: "789 Creative St, Austin, TX",
      workArea: "Design",
      contact: {
        mobileNo: "+1 (456) 789-0123",
        email: "info@creativeminds.com",
        website: "www.creativeminds.com",
      },
    },
    applyProcess: {
      needToDoForApply: "Apply through our website with your resume.",
      others: "Portfolio showcasing design work is essential.",
    },
    postedDate: "19 Sept 2024",
    deadline: "25 Sept 2024",
    skills: ["Figma", "Adobe XD"],
  },
  {
    summary: {
      jobTitle: "Backend Developer",
      vacancy: 3,
      location: "Remote",
      jobType: "Remote",
      salaryScale: "$80,000 - $100,000",
      experienceNeed: "4 Years",
    },
    requirement: {
      education: "Bachelor's Degree in Computer Science or related field",
      experience: "4 Years",
      additionalRequirements: "Proficient in Node.js, SQL, and AWS.",
      responsibility: "Developing server-side logic and database management.",
      benefits: "Competitive salary and health benefits.",
    },
    companyDetails: {
      companyName: "DevCore",
      type: "Private",
      headOffice: "321 Dev St, Seattle, WA",
      workArea: "Software Development",
      contact: {
        mobileNo: "+1 (321) 654-0987",
        email: "info@devcore.com",
        website: "www.devcore.com",
      },
    },
    applyProcess: {
      needToDoForApply: "Email your CV to our HR department.",
      others: "Mention relevant experience in your application.",
    },
    postedDate: "18 Sept 2024",
    deadline: "24 Sept 2024",
    skills: ["Node.js", "SQL", "AWS"],
  },
  {
    summary: {
      jobTitle: "Frontend Developer",
      vacancy: 5,
      location: "Remote",
      jobType: "Remote",
      salaryScale: "$70,000 - $90,000",
      experienceNeed: "2 Years",
    },
    requirement: {
      education: "Bachelor's Degree in Computer Science or related field",
      experience: "2 Years",
      additionalRequirements: "Proficiency in React and Tailwind CSS.",
      responsibility:
        "Designing and implementing user interfaces for web applications.",
      benefits: "Health insurance, flexible hours.",
    },
    companyDetails: {
      companyName: "Tech Solutions Inc.",
      type: "Private",
      headOffice: "123 Tech Ave, New York, NY",
      workArea: "Web Development",
      contact: {
        mobileNo: "+1 (123) 456-7890",
        email: "info@techsolutions.com",
        website: "www.techsolutions.com",
      },
    },
    applyProcess: {
      needToDoForApply: "Submit your resume and portfolio through our website.",
      others: "Include links to GitHub and relevant projects.",
    },
    postedDate: "21 Sept 2024",
    deadline: "30 Sept 2024",
    skills: ["React", "Tailwind CSS"],
  },
  {
    summary: {
      jobTitle: "Full Stack Developer",
      vacancy: 3,
      location: "Remote",
      jobType: "Remote",
      salaryScale: "$80,000 - $100,000",
      experienceNeed: "3 Years",
    },
    requirement: {
      education: "Master's Degree in Computer Science or related field",
      experience: "3 Years",
      additionalRequirements: "Experience with Node.js, Express, and MongoDB.",
      responsibility: "Building and maintaining web applications and services.",
      benefits: "401(k) matching, paid time off.",
    },
    companyDetails: {
      companyName: "InnovateX",
      type: "Private",
      headOffice: "456 Innovate Lane, San Francisco, CA",
      workArea: "Software Development",
      contact: {
        mobileNo: "+1 (987) 654-3210",
        email: "info@innovatex.com",
        website: "www.innovatex.com",
      },
    },
    applyProcess: {
      needToDoForApply: "Email your resume and cover letter to our HR.",
      others: "Include links to your portfolio and relevant projects.",
    },
    postedDate: "20 Sept 2024",
    deadline: "29 Sept 2024",
    skills: ["Node.js", "Express", "MongoDB"],
  },
  {
    summary: {
      jobTitle: "UI/UX Designer",
      vacancy: 4,
      location: "Remote",
      jobType: "Remote",
      salaryScale: "$60,000 - $80,000",
      experienceNeed: "1 Year",
    },
    requirement: {
      education: "Graduation in Design or related field",
      experience: "1 Year",
      additionalRequirements:
        "Familiarity with design tools like Figma and Adobe XD.",
      responsibility: "Creating user-friendly designs and prototypes.",
      benefits: "Flexible work environment.",
    },
    companyDetails: {
      companyName: "Creative Minds",
      type: "Private",
      headOffice: "789 Creative St, Austin, TX",
      workArea: "Design",
      contact: {
        mobileNo: "+1 (456) 789-0123",
        email: "info@creativeminds.com",
        website: "www.creativeminds.com",
      },
    },
    applyProcess: {
      needToDoForApply: "Apply through our website with your resume.",
      others: "Portfolio showcasing design work is essential.",
    },
    postedDate: "19 Sept 2024",
    deadline: "25 Sept 2024",
    skills: ["Figma", "Adobe XD"],
  },
  {
    summary: {
      jobTitle: "Backend Developer",
      vacancy: 3,
      location: "Remote",
      jobType: "Remote",
      salaryScale: "$80,000 - $100,000",
      experienceNeed: "4 Years",
    },
    requirement: {
      education: "Bachelor's Degree in Computer Science or related field",
      experience: "4 Years",
      additionalRequirements: "Proficient in Node.js, SQL, and AWS.",
      responsibility: "Developing server-side logic and database management.",
      benefits: "Competitive salary and health benefits.",
    },
    companyDetails: {
      companyName: "DevCore",
      type: "Private",
      headOffice: "321 Dev St, Seattle, WA",
      workArea: "Software Development",
      contact: {
        mobileNo: "+1 (321) 654-0987",
        email: "info@devcore.com",
        website: "www.devcore.com",
      },
    },
    applyProcess: {
      needToDoForApply: "Email your CV to our HR department.",
      others: "Mention relevant experience in your application.",
    },
    postedDate: "18 Sept 2024",
    deadline: "24 Sept 2024",
    skills: ["Node.js", "SQL", "AWS"],
  },
  {
    summary: {
      jobTitle: "Frontend Developer",
      vacancy: 5,
      location: "Remote",
      jobType: "Remote",
      salaryScale: "$70,000 - $90,000",
      experienceNeed: "2 Years",
    },
    requirement: {
      education: "Bachelor's Degree in Computer Science or related field",
      experience: "2 Years",
      additionalRequirements: "Proficiency in React and Tailwind CSS.",
      responsibility:
        "Designing and implementing user interfaces for web applications.",
      benefits: "Health insurance, flexible hours.",
    },
    companyDetails: {
      companyName: "Tech Solutions Inc.",
      type: "Private",
      headOffice: "123 Tech Ave, New York, NY",
      workArea: "Web Development",
      contact: {
        mobileNo: "+1 (123) 456-7890",
        email: "info@techsolutions.com",
        website: "www.techsolutions.com",
      },
    },
    applyProcess: {
      needToDoForApply: "Submit your resume and portfolio through our website.",
      others: "Include links to GitHub and relevant projects.",
    },
    postedDate: "21 Sept 2024",
    deadline: "30 Sept 2024",
    skills: ["React", "Tailwind CSS"],
  },
  {
    summary: {
      jobTitle: "Full Stack Developer",
      vacancy: 3,
      location: "Remote",
      jobType: "Remote",
      salaryScale: "$80,000 - $100,000",
      experienceNeed: "3 Years",
    },
    requirement: {
      education: "Master's Degree in Computer Science or related field",
      experience: "3 Years",
      additionalRequirements: "Experience with Node.js, Express, and MongoDB.",
      responsibility: "Building and maintaining web applications and services.",
      benefits: "401(k) matching, paid time off.",
    },
    companyDetails: {
      companyName: "InnovateX",
      type: "Private",
      headOffice: "456 Innovate Lane, San Francisco, CA",
      workArea: "Software Development",
      contact: {
        mobileNo: "+1 (987) 654-3210",
        email: "info@innovatex.com",
        website: "www.innovatex.com",
      },
    },
    applyProcess: {
      needToDoForApply: "Email your resume and cover letter to our HR.",
      others: "Include links to your portfolio and relevant projects.",
    },
    postedDate: "20 Sept 2024",
    deadline: "29 Sept 2024",
    skills: ["Node.js", "Express", "MongoDB"],
  },
  {
    summary: {
      jobTitle: "UI/UX Designer",
      vacancy: 4,
      location: "Remote",
      jobType: "Remote",
      salaryScale: "$60,000 - $80,000",
      experienceNeed: "1 Year",
    },
    requirement: {
      education: "Graduation in Design or related field",
      experience: "1 Year",
      additionalRequirements:
        "Familiarity with design tools like Figma and Adobe XD.",
      responsibility: "Creating user-friendly designs and prototypes.",
      benefits: "Flexible work environment.",
    },
    companyDetails: {
      companyName: "Creative Minds",
      type: "Private",
      headOffice: "789 Creative St, Austin, TX",
      workArea: "Design",
      contact: {
        mobileNo: "+1 (456) 789-0123",
        email: "info@creativeminds.com",
        website: "www.creativeminds.com",
      },
    },
    applyProcess: {
      needToDoForApply: "Apply through our website with your resume.",
      others: "Portfolio showcasing design work is essential.",
    },
    postedDate: "19 Sept 2024",
    deadline: "25 Sept 2024",
    skills: ["Figma", "Adobe XD"],
  },
  {
    summary: {
      jobTitle: "Backend Developer",
      vacancy: 3,
      location: "Remote",
      jobType: "Remote",
      salaryScale: "$80,000 - $100,000",
      experienceNeed: "4 Years",
    },
    requirement: {
      education: "Bachelor's Degree in Computer Science or related field",
      experience: "4 Years",
      additionalRequirements: "Proficient in Node.js, SQL, and AWS.",
      responsibility: "Developing server-side logic and database management.",
      benefits: "Competitive salary and health benefits.",
    },
    companyDetails: {
      companyName: "DevCore",
      type: "Private",
      headOffice: "321 Dev St, Seattle, WA",
      workArea: "Software Development",
      contact: {
        mobileNo: "+1 (321) 654-0987",
        email: "info@devcore.com",
        website: "www.devcore.com",
      },
    },
    applyProcess: {
      needToDoForApply: "Email your CV to our HR department.",
      others: "Mention relevant experience in your application.",
    },
    postedDate: "18 Sept 2024",
    deadline: "24 Sept 2024",
    skills: ["Node.js", "SQL", "AWS"],
  },
];
