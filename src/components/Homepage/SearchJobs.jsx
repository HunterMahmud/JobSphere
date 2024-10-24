"use client";

import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaClock } from "react-icons/fa";
import { useRouter } from "next/navigation";

const SearchJobs = () => {
  const [location, setLocation] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    router.push(
      `/jobs?search=${jobTitle}&city=${location}&jobType=${jobType}&experienceLevel=${experienceLevel}&salaryRange=${salaryRange}`
    );
  };

  return (
    <div className="p-4 md:w-4/5 mx-auto">
      <div className="flex flex-col md:flex-row items-center py-4 rounded-lg shadow-md space-y-2 md:space-y-0 w-full md:w-full"> 

        {/* Job Title Input */}
        <div className="flex items-center bg-white rounded-lg border border-accent w-full">
          <FaSearch className="ml-3 text-gray-400" />
          <input
            type="text"
            className="w-full p-2 text-slate-800 border-none focus:outline-none"
            placeholder="Job title or keyword"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>

        {/* Location Selector */}
        <div className="flex items-center mx-4 bg-white border border-accent w-full">
          <FaMapMarkerAlt className="ml-3 text-gray-400" />
          <select
            className="w-full text-slate-800 p-2 border-none focus:outline-none bg-white"
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="London, UK">London, UK</option>
            <option value="Tokyo, Japan">Tokyo, Japan</option>
          </select>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSubmit}
          className="bg-primary hover:bg-hover text-white font-semibold py-2 px-6 rounded-lg w-full md:w-auto mt-4 md:mt-0"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchJobs;

