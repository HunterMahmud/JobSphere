// JobTable.js
import React from "react";

const JobTable = () => {
  const jobDetails = [
    {
      jobTitle: "Frontend Developer",
      jobType: "Remote",
      salaryScale: "$70,000 - $90,000",
      experienceNeeded: "2 Years",
      deadline: "30 Sept 2024",
      status: "Pending",
    },
    {
      jobTitle: "Backend Developer",
      jobType: "Onsite",
      salaryScale: "$80,000 - $100,000",
      experienceNeeded: "3 Years",
      deadline: "25 Sept 2024",
      status: "Approved",
    },
    {
      jobTitle: "Full Stack Developer",
      jobType: "Remote",
      salaryScale: "$75,000 - $95,000",
      experienceNeeded: "2 Years",
      deadline: "15 Oct 2024",
      status: "Rejected",
    },
    {
      jobTitle: "UI/UX Designer",
      jobType: "Remote",
      salaryScale: "$65,000 - $85,000",
      experienceNeeded: "1 Year",
      deadline: "20 Oct 2024",
      status: "Pending",
    },
    {
      jobTitle: "DevOps Engineer",
      jobType: "Onsite",
      salaryScale: "$90,000 - $110,000",
      experienceNeeded: "4 Years",
      deadline: "28 Sept 2024",
      status: "Approved",
    },
    {
      jobTitle: "Product Manager",
      jobType: "Hybrid",
      salaryScale: "$100,000 - $120,000",
      experienceNeeded: "5 Years",
      deadline: "05 Nov 2024",
      status: "Pending",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">Job Listings</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-4 px-6 border-b border-gray-300 text-left text-gray-700 font-bold">
              Job Title
            </th>
            <th className="py-4 px-6 border-b border-gray-300 text-left text-gray-700 font-bold">
              Job Type
            </th>
            <th className="py-4 px-6 border-b border-gray-300 text-left text-gray-700 font-bold">
              Salary Scale
            </th>
            <th className="py-4 px-6 border-b border-gray-300 text-left text-gray-700 font-bold">
              Experience Needed
            </th>
            <th className="py-4 px-6 border-b border-gray-300 text-left text-gray-700 font-bold">
              Deadline
            </th>
            <th className="py-4 px-6 border-b border-gray-300 text-left text-gray-700 font-bold">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {jobDetails.map((job, index) => (
            <tr
              key={index}
              className={`hover:bg-gray-50 transition duration-150 ${
                job.status === "Approved"
                  ? "bg-green-100"
                  : job.status === "Rejected"
                  ? "bg-red-100"
                  : "bg-yellow-100"
              }`}
            >
              <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
                {job.jobTitle}
              </td>
              <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
                {job.jobType}
              </td>
              <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
                {job.salaryScale}
              </td>
              <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
                {job.experienceNeeded}
              </td>
              <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
                {job.deadline}
              </td>
              <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
                {job.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
