"use client";
import React, { useState } from "react";

const AppliedJobs = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const jobData = [
    {
      role: "Social Media Assistant",
      jobStatus: "Live",
      datePosted: "20 May 2020",
      endDate: "24 May 2020",
      jobType: "Fulltime",
      appliedStatus: "Applied",
    },
    {
      role: "Senior Designer",
      jobStatus: "Live",
      datePosted: "16 May 2020",
      endDate: "24 May 2020",
      jobType: "Fulltime",
      appliedStatus: "Applied",
    },
    {
      role: "Visual Designer",
      jobStatus: "Live",
      datePosted: "15 May 2020",
      endDate: "24 May 2020",
      jobType: "Freelance",
      appliedStatus: "Applied",
    },
    {
      role: "Data Science",
      jobStatus: "Closed",
      datePosted: "13 May 2020",
      endDate: "24 May 2020",
      jobType: "Freelance",
      appliedStatus: "Applied",
    },
    {
      role: "Kotlin Developer",
      jobStatus: "Closed",
      datePosted: "12 May 2020",
      endDate: "24 May 2020",
      jobType: "Fulltime",
      appliedStatus: "Applied",
    },
  ];

  // Filtering logic
  const filteredJobs = jobData.filter((job) => {
    return (
      (selectedRole ? job.role === selectedRole : true) &&
      (selectedStatus ? job.jobStatus === selectedStatus : true) &&
      (selectedType ? job.jobType === selectedType : true)
    );
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-center mb-8">Applied Jobs</h1>

      {/* Filter Section */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-md flex items-center justify-between">
        {/* Role Filter */}
        <div className="flex items-center space-x-4">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Filter by Role</option>
            <option value="Social Media Assistant">
              Social Media Assistant
            </option>
            <option value="Senior Designer">Senior Designer</option>
            <option value="Visual Designer">Visual Designer</option>
            <option value="Data Science">Data Science</option>
            <option value="Kotlin Developer">Kotlin Developer</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Filter by Status</option>
            <option value="Live">Live</option>
            <option value="Closed">Closed</option>
          </select>

          {/* Job Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Filter by Job Type</option>
            <option value="Fulltime">Fulltime</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        {/* Search Field */}
        {/* <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Search</button>
                </div> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-md">
        <table className="min-w-full bg-white">
          {/* Table Header */}
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left font-medium text-gray-700">
                Role
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-700">
                Job Status
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-700">
                Date Posted
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-700">
                End Date
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-700">
                Job Type
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-700">
                Applied Status
              </th>
              <th className="px-6 py-4 text-right font-medium text-gray-700"></th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {filteredJobs.map((job, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{job.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                      job.jobStatus === "Live"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {job.jobStatus}
                  </span>
                </td>
                <td className="px-6 py-4">{job.datePosted}</td>
                <td className="px-6 py-4">{job.endDate}</td>
                <td className="px-6 py-4">
                  <span className="inline-block px-2 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-600">
                    {job.jobType}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block px-2 py-1 text-sm font-medium rounded-full bg-green-100 text-green-600">
                    {job.appliedStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {/* "..." button */}
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z" />
                      <path d="M12 17.5C12.8284 17.5 13.5 16.8284 13.5 16C13.5 15.1716 12.8284 14.5 12 14.5C11.1716 14.5 10.5 15.1716 10.5 16C10.5 16.8284 11.1716 17.5 12 17.5Z" />
                      <path d="M12 7.5C12.8284 7.5 13.5 6.82843 13.5 6C13.5 5.17157 12.8284 4.5 12 4.5C11.1716 4.5 10.5 5.17157 10.5 6C10.5 6.82843 11.1716 7.5 12 7.5Z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between bg-gray-50 px-6 py-4 border-t">
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">View</span>
            <select className="border border-gray-300 rounded-md py-1 px-3 text-sm">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
            <span className="text-gray-700">Applicants per page</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-gray-700">1</button>
            <button className="text-gray-400">2</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;
