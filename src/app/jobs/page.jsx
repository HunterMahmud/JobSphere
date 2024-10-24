"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "@/components/Jobs/JobCard";
import { FaSearch } from "react-icons/fa";
import Loader from "../loading";
import { Range } from "react-range"; // Import Range component
import FilterDrawer from "@/components/Jobs/FilterDrawer"; // Import the FilterDrawer component
import { IoFilter } from "react-icons/io5";
import { GrNext, GrPrevious } from "react-icons/gr";
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
  const [experienceRange, setExperienceRange] = useState([0, 10]); // For experience range slider
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to manage drawer open/close

  useEffect(() => {
    const fetchJobsCitiesSkills = async (page = 1) => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/api/?search=${search}&city=${city}&skills=${skill}&minExperience=${experienceRange[0]}&maxExperience=${experienceRange[1]}&page=${page}&limit=6`
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
  }, [search, city, skill, experienceRange, currentPage]);

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

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="mx-auto container my-6 md:my-12 px-4 sm:px-6 lg:px-8">
      {/* Button to open the drawer */}
      <button
        onClick={toggleDrawer}
        className="md:hidden btn border-0  rounded-md px-4 my-2 py-2 bg-primary hover:bg-hover text-white mt-4"
      >
        <IoFilter className="w-8 h-6" />
      </button>

      {/* Drawer for filters */}
      <FilterDrawer
        experienceRange={experienceRange}
        setExperienceRange={setExperienceRange}
        cities={cities}
        city={city}
        handleCityChange={handleCityChange}
        skills={skills}
        skill={skill}
        handleSkillChange={handleSkillChange}
        isOpen={isDrawerOpen}
        closeDrawer={toggleDrawer}
      />
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:flex hidden flex-col items-center gap-6 w-full md:w-1/5">
          {/* Experience Range Slider */}
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="text-lg md:text-xl font-bold">Experience Range</div>
            <Range
  step={1}
  min={0}
  max={10}
  values={experienceRange}
  onChange={(values) => setExperienceRange(values)}
  renderTrack={({ props, children }) => (
    <div {...props} className="w-full h-2 bg-gray-300 rounded-lg">
      {children}
    </div>
  )}
  renderThumb={({ props }) => (
    <div {...props} className="w-6 h-6 bg-primary rounded-full shadow-lg" />
  )}
/>


            <div className="flex justify-between w-full">
              <input
                type="number"
                value={experienceRange[0]}
                min="0"
                max="10"
                onChange={(e) =>
                  setExperienceRange([
                    parseInt(e.target.value),
                    experienceRange[1],
                  ])
                }
                className="w-16 text-center bg-white border-2 border-primary rounded-md"
              />
              <input
                type="number"
                value={experienceRange[1]}
                min="0"
                max="10"
                onChange={(e) =>
                  setExperienceRange([
                    experienceRange[0],
                    parseInt(e.target.value),
                  ])
                }
                className="w-16 text-center bg-white border-2 border-primary rounded-md"
              />
            </div>

            {/* City Filter Dropdown */}
            <div className="bg-white w-full my-4 rounded-lg border-2 border-primary p-2">
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
            <div className="bg-white w-full rounded-lg border-2 border-primary p-2">
              <select
                value={skill}
                onChange={handleSkillChange}
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
        </div>

        <div className="flex-1">
          {/* Search Input */}
          <div className="flex items-center bg-white w-full mb-6 rounded-lg border-2 border-primary p-2">
            <FaSearch className="ml-3 text-gray-400" />
            <input
              type="text"
              className="w-full p-2 text-sky-800 border-none focus:outline-none"
              placeholder="Search with job title"
              onChange={handleSearch}
            />
          </div>

          {/* Job Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full">
                <Loader />
              </div>
            ) : Array.isArray(jobs) && jobs.length > 0 ? (
              jobs.map((job, index) => <JobCard key={index} job={job} />)
            ) : (
              <p className="text-center col-span-full">No jobs found</p>
            )}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-16 flex justify-center gap-1 md:gap-3 lg:gap-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="btn px-2 py-2 border-2 text-xs lg:text-lg font-semibold bg-primary hover:bg-hover rounded-lg text-white"
        >
          <GrPrevious/>
        </button>
        <div className="space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`btn px-3 py-2 border-2 text-xs lg:text-lg font-semibold hover:bg-hover  rounded-lg  ${
                currentPage === index + 1 ? "text-primary bg-white border hover:text-white border-primary" : "bg-primary text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="btn px-2 py-2 border-2 text-xs lg:text-lg font-semibold   bg-primary hover:bg-hover rounded-lg text-white"
        >
          <GrNext/>
        </button>
      </div>
    </div>
  );
};

export default JobPage;

// "use client"

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import JobCard from "@/components/Jobs/JobCard";
// import { FaSearch } from "react-icons/fa";
// import Loader from "../loading";
// import { Range } from 'react-range'; // Import Range component

// const JobPage = () => {
//   const [jobs, setJobs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [city, setCity] = useState("");
//   const [skill, setSkill] = useState(""); // Add skill state
//   const [cities, setCities] = useState([]);
//   const [skills, setSkills] = useState([]); // Add skills state
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [experienceRange, setExperienceRange] = useState([0, 10]); // For experience range slider

//   useEffect(() => {
//     const fetchJobsCitiesSkills = async (page = 1) => {
//       setLoading(true);
//       try {
//         const { data } = await axios.get(
//           `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/api/?search=${search}&city=${city}&skills=${skill}&minExperience=${experienceRange[0]}&maxExperience=${experienceRange[1]}&page=${page}&limit=6`
//         );

//         // Set jobs from the response
//         setJobs(data.jobs);
//         console.log(data);
//         // Set cities from the response
//         setCities(data.cities || []);

//         // Set skills from the response
//         setSkills(data.skills || []);

//         // Set total pages based on the total number of jobs from the backend
//         setTotalPages(data.totalPages);

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//         setLoading(false);
//       }
//     };

//     fetchJobsCitiesSkills(currentPage);
//   }, [search, city, skill, experienceRange, currentPage]);

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

//   const handleSkillChange = (e) => {
//     setCurrentPage(1);
//     setSkill(e.target.value); // Handle skill change
//   };

//   return (
//     <div className="mx-auto container my-6 md:my-12 px-4 sm:px-6 lg:px-8">
//   <div className="flex flex-col md:flex-row gap-6">
//     <div className="flex flex-col items-center gap-6 w-full md:w-1/6">
//       {/* Experience Range Slider */}
//       <div className="flex flex-col items-center gap-4 w-full">
//         <div className="text-lg md:text-xl font-bold">Experience Range</div>
//         <Range
//           step={1}
//           min={0}
//           max={10}
//           values={experienceRange}
//           onChange={(values) => setExperienceRange(values)}
//           renderTrack={({ props, children }) => (
//             <div {...props} className="w-full h-2 bg-gray-300 rounded-lg">
//               {children}
//             </div>
//           )}
//           renderThumb={({ props }) => (
//             <div
//               {...props}
//               className="w-6 h-6 bg-blue-500 rounded-full shadow-lg"
//             />
//           )}
//         />
//         <div className="flex justify-between w-full">
//           <input
//             type="number"
//             value={experienceRange[0]}
//             min="0"
//             max="10"
//             onChange={(e) =>
//               setExperienceRange([parseInt(e.target.value), experienceRange[1]])
//             }
//             className="w-16 text-center bg-white border-2 border-primary rounded-md"
//           />
//           <input
//             type="number"
//             value={experienceRange[1]}
//             min="0"
//             max="10"
//             onChange={(e) =>
//               setExperienceRange([experienceRange[0], parseInt(e.target.value)])
//             }
//             className="w-16 text-center bg-white border-2 border-primary rounded-md"
//           />
//         </div>

//         {/* City Filter Dropdown */}
//         <div className="bg-white w-full rounded-lg border-2 border-primary p-2">
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

//         {/* Skills Filter Dropdown */}
//         <div className="bg-white w-full rounded-lg border-2 border-primary p-2">
//           <select
//             value={skill}
//             onChange={handleSkillChange}
//             className="w-full p-2 text-sky-800 border-none focus:outline-none"
//           >
//             <option value="">All Skills</option>
//             {skills.map((skillObj, index) => (
//               <option key={index} value={skillObj.skill}>
//                 {skillObj.skill}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>

//     <div className="flex-1">
//       {/* Search Input */}
//       <div className="flex items-center bg-white w-full mb-6 rounded-lg border-2 border-primary p-2">
//         <FaSearch className="ml-3 text-gray-400" />
//         <input
//           type="text"
//           className="w-full p-2 text-sky-800 border-none focus:outline-none"
//           placeholder="Search with job title"
//           onChange={handleSearch}
//         />
//       </div>

//       {/* Job Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {loading ? (
//           <div className="col-span-full">
//             <Loader />
//           </div>
//         ) : Array.isArray(jobs) && jobs.length > 0 ? (
//           jobs.map((job, index) => <JobCard key={index} job={job} />)
//         ) : (
//           <p className="text-center col-span-full">No jobs found</p>
//         )}
//       </div>
//     </div>
//   </div>

//   {/* Pagination */}
//   <div className="mt-12 flex justify-center gap-3 md:gap-4 lg:gap-6">
//     <button
//       onClick={handlePreviousPage}
//       disabled={currentPage === 1}
//       className="btn px-4 py-2 text-xs md:text-sm lg:text-lg font-semibold border-2 border-primary bg-sky-300 hover:bg-sky-400 rounded-lg"
//     >
//       Previous
//     </button>
//     <div className="space-x-2">
//       {Array.from({ length: totalPages }, (_, index) => (
//         <button
//           key={index + 1}
//           onClick={() => setCurrentPage(index + 1)}
//           className={`btn px-4 py-2 text-xs md:text-sm lg:text-lg font-semibold border-2 border-primary bg-sky-300 hover:bg-sky-400 rounded-lg ${
//             currentPage === index + 1 ? "bg-primary text-white" : ""
//           }`}
//         >
//           {index + 1}
//         </button>
//       ))}
//     </div>
//     <button
//       onClick={handleNextPage}
//       disabled={currentPage === totalPages}
//       className="btn px-4 py-2 text-xs md:text-sm lg:text-lg font-semibold border-2 border-primary bg-sky-300 hover:bg-sky-400 rounded-lg"
//     >
//       Next
//     </button>
//   </div>
// </div>

//   );
// };

// export default JobPage;
