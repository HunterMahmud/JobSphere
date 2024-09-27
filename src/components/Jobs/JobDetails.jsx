import React from 'react';

const JobDetails = () => {
   const jobDetails = [
      {
         summary: {
            jobTitle: "Full Stack Developer",
            vacancy: 5,
            location: "New York, USA",
            jobType: "Full-time",
            salaryScale: "$50,000 - $70,000",
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
      <div className='border-2 border-sky-400 rounded-lg p-1 md:p-2 my-8 min-h-screen'>
         <h1 className="text-3xl font-bold underline text-center my-6">Job Details</h1>
         <h1 className='text-2xl font-semibold text-center lg:max-w-[400px] mx-auto border-b-2 border-sky-700 rounded-xl'> <span className='text-2xl font-bold'>Job Title:</span> {jobDetails[0].summary.jobTitle}</h1>

         {/* Summary */}
         <div className='md:mx-8 mx-2 border-l-2 p-2 md:p-4 rounded-lg border-sky-600 bg-sky-50 my-4'>
            <h1 className='text-2xl font-semibold underline mb-3'>Summary:</h1>
            <div className='md:grid md:grid-cols-2 md:justify-between'>
               <h4 className='text-lg font-semibold'> <span className='text-xl font-bold'>Title:</span> {jobDetails[0].summary.jobTitle}</h4>
               <h4 className='text-lg font-semibold'> <span className='text-xl font-bold'>Vacancy:</span> {jobDetails[0].summary.vacancy}</h4>
            </div>
            <div className='md:grid md:grid-cols-2 md:justify-between'>
               <h4 className='text-lg font-semibold'> <span className='text-xl font-bold'>Location:</span> {jobDetails[0].summary.location}</h4>
               <h4 className='text-lg font-semibold'> <span className='text-xl font-bold'>Job Type:</span> {jobDetails[0].summary.jobType}</h4>
            </div>
            <div className="md:grid md:grid-cols-2 md:justify-between">
               <h4 className='text-lg font-semibold'> <span className='text-xl font-bold'>Salary Scale:</span> {jobDetails[0].summary.salaryScale}</h4>
               <h4 className='text-lg font-semibold'> <span className='text-xl font-bold'>experienceNeed:</span> {jobDetails[0].summary.experienceNeed}</h4>
            </div>
         </div>

         {/* Requirement */}
         <div className='md:mx-8 mx-2 border-l-2 p-2 md:p-4 rounded-lg border-sky-600 bg-sky-50 my-4'>
            <h1 className='text-2xl font-semibold underline mb-3'>Requirements:</h1>
            <h4 className='text-lg font-semibold'> <span className='text-xl font-bold'>Education:</span> {jobDetails[0].requirement.education}</h4>
            <h4 className='text-lg font-semibold my-2'> <span className='text-xl font-bold'>Experience:</span> {jobDetails[0].requirement.experience}</h4>
            <h4 className='text-lg font-semibold'> <span className='text-xl font-bold'>Additional Requirements:</span> {jobDetails[0].requirement.additionalRequirements}</h4>
            <h4 className='text-lg font-semibold my-2'> <span className='text-xl font-bold'>Responsibility:</span> {jobDetails[0].requirement.responsibility}</h4>
            <h4 className='text-lg font-semibold'> <span className='text-xl font-bold'>Benefits:</span> {jobDetails[0].requirement.benefits}</h4>
         </div>

         {/* Company Details */}
         <div className='md:mx-8 mx-2 border-l-2 p-2 md:p-4 rounded-lg border-sky-600 bg-sky-50 my-4'>
            <h1 className='text-2xl font-semibold underline mb-3'>Company Details:</h1>
            <h4 className='text-xl font-semibold'> <span className='text-xl font-bold'>Company Name:</span> {jobDetails[0].companyDetails.companyName}</h4>
            <h4 className='text-lg font-semibold my-2'> <span className='text-xl font-bold'>Company Type:</span> {jobDetails[0].companyDetails.type}</h4>
            <h4 className='text-lg font-semibold'> <span className='text-xl font-bold'>Head Office:</span> {jobDetails[0].companyDetails.headOffice}</h4>
            <h4 className='text-lg font-semibold my-2'> <span className='text-xl font-bold'>Work Area:</span> {jobDetails[0].companyDetails.workArea}</h4>
            <h4 className='text-lg font-semibold'> <span className='text-xl font-bold'>Contact Number:</span> {jobDetails[0].companyDetails.contact.mobileNo}</h4>
            <h4 className='text-lg font-semibold'> <span className='text-xl font-bold'>Email:</span> {jobDetails[0].companyDetails.contact.email}</h4>
            <h4 className='text-lg font-semibold'> <span className='text-xl font-bold'>Website:</span> {jobDetails[0].companyDetails.contact.website}</h4>
         </div>

         {/* Apply Process */}
         <div className='md:mx-8 mx-2 border-l-2 p-2 md:p-4 rounded-lg border-sky-600 bg-sky-50 my-4'>
            <h1 className='text-2xl font-semibold underline mb-3'>Apply Process:</h1>
            <h4 className='text-lg font-semibold'> <span className='text-xl font-bold'>Need To Do For Apply:</span> {jobDetails[0].applyProcess.needToDoForApply}</h4>
            <h4 className='text-lg font-semibold my-2'> <span className='text-xl font-bold'>Others:</span> {jobDetails[0].applyProcess.others}</h4>
         </div>
      </div>
   );
};

export default JobDetails;