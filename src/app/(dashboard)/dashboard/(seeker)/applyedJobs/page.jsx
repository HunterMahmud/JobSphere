"use client";
import Loader from '@/app/loading';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaReact } from 'react-icons/fa';
import { MdBookmarkRemove, MdOutlineRemoveRedEye } from 'react-icons/md';
import Link from 'next/link';

const ApplyedJobs = () => {
  const [loading, setLoading] = useState(true);
  const session = useSession();
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/applyedJobApi/${session?.data?.user?.email}`);
      setJobs(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [session]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    setPage(1); // Reset to first page on new search
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-center mb-8">Applyed Jobs</h1>

      {/* Filter Section */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-md flex items-center justify-between">
        <div className="flex flex-col md:flex-row justify-between gap-4 w-full">
          <select
            className="border border-gray-300 rounded-md py-2 w-full px-4 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option disabled value="">Filter by Status</option>
            <option value="">All</option>
            <option value="Live">Live</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring focus:border-blue-300"
          >
            <option disabled value="">Filter by Job Type</option>
            <option value="">All</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract-Based">Contract-Based</option>
          </select>

          <div className="flex gap-2 w-full">
            <input
              type="text"
              placeholder="Search by job title..."
              className="border w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
            />
            <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 text-white rounded-md">Search</button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-md">
        {
          loading ? <Loader /> : <table className="min-w-full bg-white">
            {/* Table Header */}
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left font-medium text-gray-700">#</th>
                <th className="px-6 py-4 text-left font-medium text-gray-700">Job Title</th>
                <th className="px-6 py-4 text-left font-medium text-gray-700">Job Status</th>
                <th className="px-6 py-4 text-left font-medium text-gray-700">Job Type</th>
                <th className="px-6 py-4 text-left font-medium text-gray-700">Job applyed Date</th>
                <th className="px-6 py-4 text-right font-medium text-gray-700">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {jobs?.map((job, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 text-xs md:text-sm">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-1 md:px-3 lg:px-6 py-4 flex items-center gap-2">
                    {job?.jobTitle}
                  </td>
                  <td className="px-6 py-4">
                    {/* <span
                      className={`inline-block px-2 py-1 font-medium rounded-full ${new Date(job?.job?.deadline) > today
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                        }`}
                    >
                      {
                        new Date(job?.deadline) > today ? "Live" : "Closed"
                      }
                    </span> */}
                  </td>
                  <td className="px-1 md:px-3 lg:px-6 py-4">
                    <span className="inline-block px-2 py-1 font-medium rounded-full bg-blue-100 text-blue-600">
                      {job?.jobType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 font-medium rounded-full bg-green-100 text-green-600">
                      {job?.vacancy}
                    </span>
                  </td>
                  <td className="px-6 py-4">{new Date(job.job?.deadline).toLocaleDateString()}</td>
                  <td className="pl-6 py-4 text-right flex gap-2">
                    <button
                      className="flex items-center justify-center gap-1 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition mx-2"
                    >
                      <MdBookmarkRemove className="text-lg flex items-center justify-center" />
                    </button>
                    <Link href={`/jobs/${job?.job?._id}`}>
                      <button
                        className="flex items-center justify-center gap-1 bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition"
                      >
                        <MdOutlineRemoveRedEye className="text-lg flex items-center justify-center" />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    </div>
  );
};

export default ApplyedJobs;