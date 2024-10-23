"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "@/components/Jobs/JobCard";
import { FaSearch } from "react-icons/fa";
import Loader from "../loading";

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [skill, setSkill] = useState(""); // Add skill state
  const [cities, setCities] = useState([]);
  const [skills, setSkills] = useState([]); // Add skills state
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchJobsCitiesSkills = async (page = 1) => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/api/?search=${search}&city=${city}&skills=${skill}&page=${page}&limit=6`
        );

        // Set jobs from the response
        setJobs(data.jobs);
        console.log(data);
        // Set cities from the response
        setCities(data.cities || []);

        // Set skills from the response
        setSkills(data.skills || []);

        // Set total pages based on the total number of jobs from the backend
        setTotalPages(data.totalPages);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchJobsCitiesSkills(currentPage);
  }, [search, city, skill, currentPage]);

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
    setCurrentPage(1);
    setSearch(e.target.value);
  };

  const handleCityChange = (e) => {
    setCurrentPage(1);
    setCity(e.target.value);
  };

  const handleSkillChange = (e) => {
    setCurrentPage(1);
    setSkill(e.target.value); // Handle skill change
  };

  return (
    <div className="w-11/12 md:w-5/6 lg:w-4/5 mx-auto my-12">
      {/* Search Function */}
      <div className="flex justify-center items-center gap-4 flex-wrap mx-auto my-8">
        {/* Search Input */}
        <div className="flex items-center bg-white w-[300px] rounded-l-lg border-2 border-sky-500 my-8 p-2">
          <FaSearch className="ml-3 text-gray-400" />
          <input
            type="text"
            className="w-[200px] p-2 text-sky-800 border-sky-600 border-none focus:outline-none"
            placeholder="Search with job title"
            onChange={handleSearch}
          />
        </div>

        {/* City Filter Dropdown */}
        <div className="bg-white rounded-lg border-2 border-sky-500 w-[300px] p-2">
          <select
            value={city}
            onChange={handleCityChange}
            className="w-full p-2 text-sky-800 border-none focus:outline-none"
          >
            <option value="">All Cities</option>
            {cities.map((cityObj, index) => (
              <option key={index} value={cityObj.city}>
                {cityObj.city}
              </option>
            ))}
          </select>
        </div>

        {/* Skills Filter Dropdown */}
        <div className="bg-white rounded-lg border-2 border-sky-500 w-[300px] p-2">
          <select
            value={skill}
            onChange={handleSkillChange} // Handle skill change
            className="w-full p-2 text-sky-800 border-none focus:outline-none"
          >
            <option value="">All Skills</option>
            {skills.map((skillObj, index) => (
              <option key={index} value={skillObj.skill}>
                {skillObj.skill}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading ? (
          <div className="md:grid-cols-2 lg:col-span-3">
            <Loader />
          </div>
        ) : Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job, index) => <JobCard key={index} job={job} />)
        ) : (
          <p className="text-center md:grid-cols-2 lg:col-span-3">
            No jobs found
          </p>
        )}
      </div>

{/* //       Pagination */}

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
              className={`btn px-4 py-2 border-2 text-xs lg:text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg ${
                currentPage === index + 1 ? "bg-sky-500 text-white" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="btn px-4 py-2 border-2 text-xs lg:text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobPage;








// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import JobCard from "@/components/Jobs/JobCard";
// import { FaSearch } from "react-icons/fa";
// import Loader from "../loading";

// const JobPage = () => {
//   const [jobs, setJobs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [city, setCity] = useState("");
//   const [cities, setCities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   // const limit = 6; // items per page

//   useEffect(() => {
//     const fetchJobsAndCities = async (page = 1) => {
//       setLoading(true);
//       try {
//         const { data } = await axios.get(
//           `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/api/?search=${search}&city=${city}&page=${page}&limit=6`
//         );
        

//         // Set jobs from the response
//       // totalJobs, // Total jobs after filtering
//         setJobs(data.jobs);
//         console.log(data);
//         // Set cities from the response
//         setCities(data.cities || []);

//         // Set total pages based on the total number of jobs from the backend
//         setTotalPages(data.totalPages);

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//         setLoading(false);
//       }
//     };

//     fetchJobsAndCities(currentPage);
//   }, [search, city, currentPage]);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleSearch = (e) => {
//     setCurrentPage(1);
//     setSearch(e.target.value);
//   };

//   const handleCityChange = (e) => {
//     setCurrentPage(1);
//     setCity(e.target.value);
//   };

//   return (
//     <div className="w-11/12 md:w-5/6 lg:w-4/5 mx-auto my-12">
//       {/* Search Function */}
//       <div className="flex justify-center items-center gap-4 flex-wrap mx-auto my-8">
//         {/* Search Input */}
//         <div className="flex items-center bg-white w-[300px] rounded-l-lg border-2 border-sky-500 my-8 p-2">
//           <FaSearch className="ml-3 text-gray-400" />
//           <input
//             type="text"
//             className="w-[200px] p-2 text-sky-800 border-sky-600 border-none focus:outline-none"
//             placeholder="Search with job title"
//             onChange={handleSearch}
//           />
//         </div>

//         {/* City Filter Dropdown */}
//         <div className="bg-white rounded-lg border-2 border-sky-500 w-[300px] p-2">
//           <select
//             value={city}
//             onChange={handleCityChange}
//             className="w-full p-2 text-sky-800 border-none focus:outline-none"
//           >
//             <option value="">All Cities</option>
//             {cities.map((cityObj, index) => (
//               <option key={index} value={cityObj.city}>
//                 {cityObj.city}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Job Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//         {loading ? (
//           <div className="md:grid-cols-2 lg:col-span-3">
//             <Loader />
//           </div>
//         ) : Array.isArray(jobs) && jobs.length > 0 ? (
//           jobs.map((job, index) => <JobCard key={index} job={job} />)
//         ) : (
//           <p className="text-center md:grid-cols-2 lg:col-span-3">
//             No jobs found
//           </p>
//         )}
//       </div>

//       {/* Pagination */}
//       <div className="mt-16 flex justify-center gap-1 md:gap-3 lg:gap-6">
//         <button
//           onClick={handlePreviousPage}
//           disabled={currentPage === 1}
//           className="btn px-4 py-2 border-2 text-xs lg:text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg"
//         >
//           Previous
//         </button>
//         <div className="space-x-2">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//   key={index + 1}
//   onClick={() => setCurrentPage(index + 1)}
//   className={`btn px-4 py-2 border-2 text-xs lg:text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg ${
//     currentPage === index + 1 ? "bg-sky-500 text-white" : ""
//   }`}
// >
//   {index+1}
// </button>

//           ))}
//         </div>
//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//           className="btn px-2 py-2 border-2 text-xs lg:text-lg font-semibold hover:border hover:border-sky-700 bg-sky-300 hover:bg-sky-400 rounded-lg"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobPage;


