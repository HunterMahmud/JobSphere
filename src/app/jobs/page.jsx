"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "@/components/Jobs/JobCard";
import { FaSearch } from "react-icons/fa";
const JobPage = () => {
  const [jobs, setJobs] = useState([]); // Initialize as an array
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/api`);
        setJobs(data.jobs);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Failed to fetch jobs");
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="container mx-auto my-12">
      <h1 className="text-3xl font-bold text-center mb-8 underline underline-offset-2">Jobs</h1>

      {/* Search Function */}
      <div className="flex items-center bg-white rounded-l-lg border-2 border-sky-500 w-[300px] mx-auto my-8 p-2">
        <FaSearch className="ml-3 text-gray-400" />
        <input
          type="text"
          className="w-[300px] p-2 text-sky-800 border-sky-600 border-none focus:outline-none"
          placeholder="Search with Skill or Types"
          value={""}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job, index) => <JobCard key={index} job={job} />)
        ) : (
          <p className="text-center">No jobs found</p>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-16 flex justify-center gap-6">
        <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
          Previous
        </button>
        <div className="space-x-2">
          <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
            1
          </button>
          <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
            2
          </button>
          <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
            3
          </button>
          <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
            ...
          </button>
          <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
            8
          </button>
        </div>
        <button className="btn px-4 py-2 border-2 text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg">
          Next
        </button>
      </div>
    </div>
  );
};

export default JobPage;
