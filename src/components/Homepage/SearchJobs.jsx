"use client";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import Select from "react-select"; // Import react-select
import useRole from "../Hooks/useRole"
const SearchJobs = () => {
  const [jobTitles, setJobTitles] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const { loggedInUser } = useRole();
  useEffect(() => {
    const fetchJobsCities = async (page = 1) => {
      setLoading(true)
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/api/?search=${search}&city=${city}`
        );

        // Set jobTitles from the response
        // setJobTitles(data.jobTitles || []);
        console.log(data);
        // Map cities to match react-select option format
        const cityOptions = data.cities.map((city) => ({
          name: city.city, // The value selected
          label: city.city, // The text displayed
        }));
        setCities(cityOptions); // Store city options
        setLoading(false);

      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchJobsCities();
  }, [search, city]);

  // Handle job search
  const handleSubmit = () => {
    // if (loggedInUser?.status === "blocked") {
    //   toast.error("You are blocked by the authority. Please contact support for assistance.");
    //   return;
    // }
    // Extract the value of city if it's an object, otherwise use an empty string
    const selectedCity = city ? city?.name : "";

    // Redirect with the search term and selected city
    router.push(
      `/jobs?search=${search}&city=${selectedCity}`
    );
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      '&:hover': {
        border: 'none',
      },
    }),
  };


  return (
    <div className="p-4 md:w-4/5 mx-auto">
      <div className="text-3xl font-extrabold mb-4 text-center">
        Find the right job
      </div>
      <div className="text-xl text-gray-600 text-center mb-8">
        Discover opportunities that match your skills and passion
      </div>
      <div className="flex flex-col md:mb-12 mb-6 md:flex-row items-center py-4 rounded-lg shadow-md space-y-2 md:space-y-0 w-full md:w-full">

        {/* Job Title Input */}
        <div className="flex items-center mx-4 bg-white border border-accen rounded-md w-full">
          <FaSearch className="ml-3 text-gray-400" />
          <input
            type="text"
            className="w-full text-slate-800 p-[14px] border-none focus:outline-none bg-white"
            placeholder="Search by Job Title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            list="jobTitles" // Use datalist for search suggestions
          />
          <datalist id="jobTitles">
            {/* Dynamically populate jobTitles */}
            {jobTitles.length > 0 ? (
              jobTitles.map((Obj, index) => (
                <option key={index} value={Obj.jobTitle}>
                  {Obj.jobTitle}
                </option>
              ))
            ) : (
              <option disabled>No jobTitles available</option>
            )}
          </datalist>
        </div>

        {/* Location Selector with react-select */}
        <div className="flex items-center mx-4 bg-white border border-accent rounded-md w-full">
          <FaMapMarkerAlt className="ml-3 text-gray-400" />
          <Select
            options={cities} // Provide cities as options
            value={city} // Controlled state for selected city
            onChange={setCity} // Update state when city is selected
            placeholder="Search Location"
            styles={customStyles}
            isClearable // Allow the user to clear the selection
            className="w-full text-slate-800 p-2 border-none focus:outline-none bg-white"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSubmit}
          className="bg-primary hover:bg-hover text-white font-semibold py-[16px] px-6 rounded-md w-full md:w-auto mt-4 md:mt-0"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchJobs;
