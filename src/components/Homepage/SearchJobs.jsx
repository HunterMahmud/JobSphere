"use client"

import React from 'react';
import { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const SearchJobs = () => {
    const [location, setLocation] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const router = useRouter();

    const handleSubmit = ()=>{
        router.push(`/jobs?search=${jobTitle}&city=${location}`)
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row items-center py-4 rounded-lg shadow-md w-full md:w-4/5 space-y-2 md:space-y-0"> 
          {/* Job Title Input  */}
          <div className="flex items-center bg-white rounded-l-lg border border-gray-300 w-full ">
              <FaSearch className="ml-3 text-gray-400" />
              <input
                type="text"
                className="w-full p-2 text-slate-800 border-none focus:outline-none"
                placeholder="Job title or keyword"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div> 

          {/* Location Selector  */}
          <div className="flex items-center bg-white border-t border-b border-gray-300 w-full ">
              <FaMapMarkerAlt className="ml-3 text-gray-400" />
              <select
                className="w-full text-slate-800 p-2 border-none focus:outline-none bg-white"
                onChange={(e) => setLocation(e.target.value)}
              >
                <option disabled value="">Select Location</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="London, UK">London, UK</option>
                <option value="Tokyo, Japan">Tokyo, Japan</option>
              </select>
            </div> 

          {/* Search Button  */}
          <button onClick={handleSubmit} className="bg-primary hover:bg-hover text-white font-semibold py-2 px-6 rounded-r-lg w-auto md:w-1/2">
              Search
            </button> 
          </div> 
        </div>
    );
};

export default SearchJobs;