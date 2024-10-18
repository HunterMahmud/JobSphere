"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Countdown from "react-countdown";
import Loader from '@/app/loading';

const JobTable = () => {
  const [jobDetails, setJobDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // for sorting
  const [jobTypeFilter, setJobTypeFilter] = useState(""); // for filtering by job type
  const [searchTerm, setSearchTerm] = useState(""); // for searching by job title
  const [page, setPage] = useState(1); // current page
  const [limit, setLimit] = useState(10); // items per page
  const [total, setTotal] = useState(0); // total number of jobs
  const currentTime = Date.now(); // Current time in milliseconds

  // Fetch jobs from the API
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/jobManagement/api/allJobs`,
        {
          params: {
            jobType: jobTypeFilter,
            sort: sortOrder,
            jobTitle: searchTerm,
            page, // current page
            limit, // items per page
          },
        }
      );
      setJobDetails(response.data.jobs);
      setTotal(response.data.total); // assuming the API returns the total count of jobs
      setLoading(false);
    } catch (err) {
      setError("Failed to load job listings.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [sortOrder, jobTypeFilter, searchTerm, page, limit]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  if (error) {
    return <p>{error}</p>;
  }

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
            placeholder="Search by Job Title and press Enter..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchTerm(e.target.value);
              }
            }}
            className="border w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>

      {/* Table */}
      {
            loading ? <Loader /> :
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-4 text-left font-medium text-gray-700">#</th>
            <th className="px-6 py-4 text-left font-medium text-gray-700">
              Job Title
            </th>
            <th className="px-6 py-4 text-left font-medium text-gray-700">
              Job Type
            </th>
            <th className="px-6 py-4 text-left font-medium text-gray-700">
              Salary Scale
            </th>
            <th className="px-6 py-4 text-left font-medium text-gray-700">
              Experience Needed
            </th>
            <th className="px-6 py-4 text-left font-medium text-gray-700">
              Deadline
            </th>
          </tr>
        </thead>
        <tbody>
          {jobDetails?.map((job, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-50 text-xs md:text-sm"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
                {job.jobTitle}
              </td>
              <td className="px-1 md:px-3 lg:px-6 py-4">
                <span className="inline-block px-2 py-1 font-medium rounded-full bg-blue-100 text-blue-600">
                  {job?.jobType}
                </span>
              </td>
              <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
                {job.salaryScale}
              </td>
              <td className="px-6 py-4">
                                        <span className="inline-block px-2 py-1 font-medium rounded-full bg-green-100 text-green-600">
                                            {job?.experience}
                                        </span>
                                    </td>
              <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
                {/* Conditionally render countdown if the deadline is greater than 1 second from now */}
                {new Date(job.deadline).getTime() - currentTime > 1000 ? (
                  <Countdown date={new Date(job.deadline)} />
                ) : (
                  "Deadline has passed"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       }

      {/* Pagination Controls */}
      <div className="flex items-center justify-between bg-gray-50 px-6 py-4 border-t">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">View</span>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(parseInt(e.target.value));
              setPage(1);
            }}
            className="border border-gray-300 rounded-md py-1 px-3"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <span className="text-gray-700 block w-full pr-6">Jobs per page</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`text-gray-700 ${page === 1 && "cursor-not-allowed"}`}
          >
            Previous
          </button>
          <div className="space-x-2 flex">
            {Array.from({ length: Math.ceil(total / limit) }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setPage(index + 1)}
                className={`btn px-3 py-2 border-2 text-xs font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg ${
                  page === index + 1 ? "bg-sky-500 text-white" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            disabled={page === Math.ceil(total / limit)}
            onClick={() => setPage(page + 1)}
            className={`text-gray-700 ${
              page === Math.ceil(total / limit) && "cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobTable;

{
  /* <td className="border border-gray-300 px-4 py-2">
                  {contest.deadline ? (
                    <Countdown date={contest.deadline} />
                  ) : (
                    "Contest Ended"
                  )}
                </td> */
}
