"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const JobTable = () => {
  const [jobDetails, setJobDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // for sorting
  const [jobTypeFilter, setJobTypeFilter] = useState(""); // for filtering by job type
  const [searchTerm, setSearchTerm] = useState(""); // for searching by job title

  // Fetch jobs from the API
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/dashboard/jobManagement/api/allJobs`,
        {
          params: {
            jobType: jobTypeFilter,
            sort: sortOrder,
            jobTitle: searchTerm,
          },
        }
      );
      setJobDetails(response.data.jobs);
      console.log(response.data)
      setLoading(false);
    } catch (err) {
      setError("Failed to load job listings.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [sortOrder, jobTypeFilter, searchTerm]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  console.log(jobDetails)

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">Job Listings</h2>

      {/* Filters */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-md flex items-center justify-between">
        <div className="flex flex-col md:flex-row justify-between gap-4 w-full">
          {/* Sort by Deadline */}
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Sort by Deadline</option>
            <option value="asc">Ascending</option>
            <option value="dsc">Descending</option>
          </select>

          {/* Filter by Job Type */}
          <select
            onChange={(e) => setJobTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Filter by Job Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
          </select>

          {/* Search by Job Title */}
          <input
            type="text"
            placeholder="Search by job title..."
            onBlur={(e) => setSearchTerm(e.target.value)}
            className="border w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-4 px-6 border-b border-gray-300 text-left text-gray-700 font-bold">Job Title</th>
            <th className="py-4 px-6 border-b border-gray-300 text-left text-gray-700 font-bold">Job Type</th>
            <th className="py-4 px-6 border-b border-gray-300 text-left text-gray-700 font-bold">Salary Scale</th>
            <th className="py-4 px-6 border-b border-gray-300 text-left text-gray-700 font-bold">Experience Needed</th>
            <th className="py-4 px-6 border-b border-gray-300 text-left text-gray-700 font-bold">Deadline</th>
          </tr>
        </thead>
        <tbody>
          {jobDetails?.map((job, index) => (
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
              <td className="py-4 px-6 border-b border-gray-200 text-gray-800">{job.jobTitle}</td>
              <td className="py-4 px-6 border-b border-gray-200 text-gray-800">{job.jobType}</td>
              <td className="py-4 px-6 border-b border-gray-200 text-gray-800">{job.salaryScale}</td>
              <td className="py-4 px-6 border-b border-gray-200 text-gray-800">{job.experience}</td>
              <td className="py-4 px-6 border-b border-gray-200 text-gray-800">{job.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
