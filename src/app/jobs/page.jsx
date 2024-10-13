"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "@/components/Jobs/JobCard";
import { FaSearch } from "react-icons/fa";
import Loader from "../loading";

const JobPage = () => {
  const [jobs, setJobs] = useState([]); // Initialize as an array
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages



  useEffect(() => {
    const fetchJobs = async (page = 1) => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/api/?search=${search}&page=${page}&limit=9`
        );
        setJobs(data.jobs);
        setTotalPages(data.totalPages); // Set total pages from response
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };
    fetchJobs(currentPage); // Fetch jobs when page or search changes
  }, [search, currentPage,]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleSearch = (e) => {
    setCurrentPage(1)
    setSearch(e.target.value)
  };

  return (
    <div className="w-11/12 md:w-5/6 lg:w-4/5 mx-auto my-12">
      <h1 className="text-3xl font-bold text-center mb-8 underline underline-offset-2">Jobs</h1>

      {/* Search Function */}
      <div className="flex items-center bg-white rounded-l-lg border-2 border-sky-500 w-[300px] mx-auto my-8 p-2">
        <FaSearch className="ml-3 text-gray-400" />
        <input
          type="text"
          className="w-[300px] p-2 text-sky-800 border-sky-600 border-none focus:outline-none"
          placeholder="Search with job title"
          onChange={(e) => handleSearch(e) }
        />
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading ? (
          <div className="md:grid-cols-2 lg:col-span-3">
            <Loader />
          </div>
        ) : Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job, index) => <JobCard key={index} job={job} />)
        ) : (
          <p className="text-center md:grid-cols-2 lg:col-span-3">No jobs found</p>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-16 flex justify-center gap-1 md:gap-3 lg:gap-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="btn px-4 py-2 border-2 text-xs lg:text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg"
        >
          Previous
        </button>
        <div className="space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`btn px-4 py-2 border-2 text-xs lg:text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg ${currentPage === index + 1 ? "bg-sky-500 text-white" : ""
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="btn px-2 py-2 border-2 text-xs lg:text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobPage;
