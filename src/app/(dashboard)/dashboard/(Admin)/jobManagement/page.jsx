"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Countdown from "react-countdown";
import Loader from "@/app/loading";
import Link from "next/link";
import { CgUnblock } from "react-icons/cg";
import { MdBlock } from "react-icons/md";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const JobTable = () => {
  const [jobDetails, setJobDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // for sorting
  const [jobTypeFilter, setJobTypeFilter] = useState(""); // for filtering by job type
  const [jobStatusFilter, setJobStatusFilter] = useState(""); // for filtering by job type
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
            status: jobStatusFilter
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
  }, [sortOrder, jobTypeFilter, searchTerm, page, limit, jobStatusFilter]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  const handleStatus = async (id, status) => {
    const data = { id, status }

    Swal.fire({
      title: "Are you sure?",
      text: "You are blocking the User!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#60A5FA",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${data?.status} it !`
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {

          const response = await axios.patch('/dashboard/jobManagement/api/jobStatus', { data });


          if (response.data?.message) {
            toast.success("Job Status Successfully changed")

            fetchJobs()
          };
        } catch (error) {
          toast.error(error.message)


        }
      }
    });

  };


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
            onChange={(e) => {setSortOrder(e.target.value); setPage(1) }}
            value={sortOrder}
            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Sort by Deadline</option>
            <option value="asc">Ascending</option>
            <option value="dsc">Descending</option>
          </select>

          {/* filter by Status */}
          <select
            onChange={(e) =>{setJobStatusFilter(e.target.value); setPage(1) }}
            value={jobStatusFilter}
            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none"
          >
            <option value="">Filter by Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>

          {/* Filter by Job Type */}
          <select
            onChange={(e) => {setJobTypeFilter(e.target.value); setPage(1) }}
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
            placeholder="Search by Job Title..."
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1) }}
            className="border w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <Loader />
      ) : (
        jobDetails.length>0?
        <>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-x-auto">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left font-medium text-gray-700">
                #
              </th>
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
              <th className="px-6 py-4 text-left font-medium text-gray-700">
                Status
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {jobDetails?.map((job, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 text-xs md:text-sm"
              >
                <td className="px-6 py-4">{(page - 1) * limit + index + 1}</td>
                <td className="py-4 px-6 border-b hover:underline border-gray-200 text-gray-800">
                  <Link href={`/jobs/${job?._id}`}>{job?.jobTitle}</Link>
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
                    "closed"
                  )}
                </td>
                <td className="py-6 px-4">

                  <span
                    className={`${job?.status === "blocked"
                      ? " bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                      } inline-block px-2 py-1 font-medium rounded-full`}
                  >
                    {job?.status === "blocked" ? "blocked" : "active"}
                  </span>

                </td>

                <td className="py-4 px-6 border-b border-gray-200 text-gray-800">
                  {
                    job?.status === "blocked" ?
                      <button
                        onClick={() => handleStatus(job._id, "active")}
                        className={`bg-green-500 text-white py-1 px-3 rounded-md transition hover:bg-green-600 `}>
                        <CgUnblock />
                      </button> :
                      <button
                        onClick={() => handleStatus(job._id, "blocked")}
                        className={`bg-red-500 text-white py-1 px-3 rounded-md transition hover:bg-red-600`}>
                        <MdBlock />
                      </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination  */}
        <div className="flex items-center justify-between bg-gray-50 px-6 py-4 border-t">
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">View</span>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(parseInt(e.target.value)), setPage(1);
              }}
              className="border border-gray-300 rounded-md py-1 px-3"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
            <span className="text-gray-700 block w-full pr-6">
              Applicants per page
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`${page === 1 ? "cursor-not-allowed text-gray-400" : "text-gray-700"
                }`}
            >
              <span className="sr-only">Prev Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="space-x-2 flex">
              <p className="text-base text-gray-900">
                {page}
                <span className="mx-0.25">/</span>
                {Math.ceil(total / limit)}
              </p>
            </div>

            <button
              disabled={page === Math.ceil(total / limit)}
              onClick={() => setPage(page + 1)}
              className={`${page === Math.ceil(total / limit) ? "cursor-not-allowed text-gray-400" : "text-gray-700 "
                }`}
            >
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </>:<h1 className="text-center text-2xl font-bold mt-5">{error? error :"No job found"}</h1>
      )}


    </div>
  );
};

export default JobTable;

