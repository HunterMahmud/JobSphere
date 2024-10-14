"use client";
import Loader from '@/app/loading';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { MdBookmarkRemove, MdOutlineRemoveRedEye } from 'react-icons/md';
import Link from 'next/link';
import Swal from 'sweetalert2';

const ApplyedJobs = () => {
  const [loading, setLoading] = useState(true);
  const session = useSession();
  const [jobs, setJobs] = useState([]);
  console.log(jobs)
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

  };
  // handle Remove Applyed job
  const handleRemove = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won&apos;t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send DELETE request to the server
          const { data } = await axios.delete(
            `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/applyedJobApi/deleteApplyedJob/${id}`
          );

          if (data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch()
          }
          // Re-fetch the jobs after deletion
          fetchJobs();
        } catch (error) {
          // Handle error
          console.log(error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the job.",
            icon: "error",
          });
        }
      }
    });
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
                <th className="px-6 py-4 text-center font-medium text-gray-700">Actions</th>
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

                  <td className="px-1 md:px-3 lg:px-6 py-4">
                    <span className={`${job?.jobStatus === 'pending' ? 'bg-blue-100 text-blue-600' : job?.jobStatus === 'rejected' ? 'bg-red-100 text-red-600' : ''} inline-block px-2 py-1 font-medium rounded-full `}>
                      {job?.jobStatus}
                    </span>
                  </td>

                  <td className="px-6 py-4">{job?.jobType}</td>

                  <td className="px-6 py-4">{new Date(job?.applicationDate).toLocaleDateString()}</td>
                  <td className="pl-6 py-4 text-right flex gap-2">
                    <button
                      onClick={() => handleRemove(job?._id)}
                      className="flex items-center justify-center gap-1 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition mx-2"
                    >
                      <MdBookmarkRemove className="text-lg flex items-center justify-center" />
                    </button>
                    <Link href={`/jobs/${job?.jobId}`}>
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