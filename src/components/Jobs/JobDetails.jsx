import React from 'react';

const JobDetails = () => {
   const jobDetails = [
      {
         summary: {
            jobTitile: "Full Stack Developer",
            vacancy: 5,
            location: "New York, USA",
            salary: "$50,000 - $70,000",
            scale: "Mid-level",
            experienceNeed: "3-5 years",
         },
         requirement: {
            education: "Bachelor's degree in Computer Science or related field",
            experience: "3-5 years of experience in software development",
            additionalRequirements: "Experience with MERN stack, strong problem-solving skills",
            responsibility: "Develop, test, and maintain web applications using modern technologies.",
            benefits: [
               "Health insurance",
               "Flexible working hours",
               "Remote work opportunities",
               "Paid time off"
            ],
            salaryReview: "Annually based on performance",
            jobType: "Full-time",
            jobLocation: "New York, USA",
         },
         companyDetails: {
            companyName: "Innovative Coders",
            type: "Software Development",
            headOffice: "New York, USA",
            workArea: "Global",
            contact: {
               mobileNo: "+1 123-456-7890",
               email: "hr@innovativecoders.com",
               website: "https://www.innovativecoders.com"
            },
         },
         applyProcess: {
            needToDoForApply: "Submit your resume and portfolio through our website or email.",
            others: "Ensure you meet the minimum qualifications before applying."
         }
      }
   ];

   return (
      <div className='border-2 border-sky-400 rounded-lg p-2 my-8 h-screen'>
         <h1 className="text-3xl font-bold underline text-center mb-8">Job Details</h1>
        <h1 className=''> Job Title: {jobDetails[0].summary.jobTitile}</h1>
      </div>
   );
};

export default JobDetails;