"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSave } from "react-icons/fa";
import { FcProcess } from "react-icons/fc";
import { useSession } from "next-auth/react";
import Loader from "@/app/loading";

const JobDetails = ({ params }) => {
  const [jobDetails, setJobDetails] = useState(null); // State to store job details
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors
  const { data: session } = useSession();
  console.log(session?.user , "check my");
  
  const getServicesDetails = async (id) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/api/${id}`);
      return res.data.job;
    } catch (error) {
      console.error("Error fetching job details:", error);
      setError("Could not fetch job details.");
      return null;
    }
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      const details = await getServicesDetails(params.id);
      if (details) {
        setJobDetails(details);
      }
      setLoading(false); // Stop loading once data is fetched
    };

    fetchJobDetails();
  }, [params.id]); // Dependency on params.id to fetch details when it changes

  if (loading) {
    return <Loader/>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

  // Fallback if no job details are available
  if (!jobDetails || !jobDetails.summary) {
    return <div>No job details available.</div>;
  }

  const handleSaveJob =()=>{
   const job ={}
    
  }

 

  return (
    <div className="border-2 border-sky-400 rounded-lg p-1 md:p-2 my-8 min-h-screen">
      <h1 className="text-3xl font-bold underline text-center my-6">
        Job Details
      </h1>
      <h1 className="text-2xl font-semibold text-center lg:max-w-[400px] mx-auto border-b-2 border-sky-700 rounded-xl">
        <span className="text-2xl font-bold">Job Title:</span>{" "}
        {jobDetails.summary.jobTitle || "N/A"}
      </h1>

      {/* Summary */}
      <div className="md:mx-8 mx-2 border-l-2 p-2 md:p-4 rounded-lg border-sky-600 bg-sky-50 my-4">
        <h1 className="text-2xl font-semibold underline mb-3">Summary:</h1>
        <div className="md:grid md:grid-cols-2 md:justify-between">
          <h4 className="text-lg font-semibold">
            {" "}
            <span className="text-xl font-bold">Title:</span>{" "}
            {jobDetails.summary.title || "N/A"}
          </h4>
          <h4 className="text-lg font-semibold">
            {" "}
            <span className="text-xl font-bold">Vacancy:</span>{" "}
            {jobDetails.summary.vacancy || "N/A"}
          </h4>
        </div>
        <div className="md:grid md:grid-cols-2 md:justify-between">
          <h4 className="text-lg font-semibold">
            {" "}
            <span className="text-xl font-bold">Location:</span>{" "}
            {jobDetails.summary.location || "N/A"}
          </h4>
          <h4 className="text-lg font-semibold">
            {" "}
            <span className="text-xl font-bold">Job Type:</span>{" "}
            {jobDetails.summary.jobType || "N/A"}
          </h4>
        </div>
        <div className="md:grid md:grid-cols-2 md:justify-between">
          <h4 className="text-lg font-semibold">
            {" "}
            <span className="text-xl font-bold">Salary Scale:</span>{" "}
            {jobDetails.summary.salaryScale || "N/A"}
          </h4>
          <h4 className="text-lg font-semibold">
            {" "}
            <span className="text-xl font-bold">Experience Needed:</span>{" "}
            {jobDetails.summary.experienceNeed || "N/A"}
          </h4>
        </div>
      </div>

      {/* Requirement */}
      <div className="md:mx-8 mx-2 border-l-2 p-2 md:p-4 rounded-lg border-sky-600 bg-sky-50 my-4">
        <h1 className="text-2xl font-semibold underline mb-3">Requirements:</h1>
        <h4 className="text-lg font-semibold">
          {" "}
          <span className="text-xl font-bold">Education:</span>{" "}
          {jobDetails.requirement.education || "N/A"}
        </h4>
        <h4 className="text-lg font-semibold my-2">
          {" "}
          <span className="text-xl font-bold">Experience:</span>{" "}
          {jobDetails.requirement.experience || "N/A"}
        </h4>
        <h4 className="text-lg font-semibold">
          {" "}
          <span className="text-xl font-bold">
            Additional Requirements:
          </span>{" "}
          {jobDetails.requirement.additionalRequirements || "N/A"}
        </h4>
        <h4 className="text-lg font-semibold my-2">
          {" "}
          <span className="text-xl font-bold">Responsibility:</span>{" "}
          {jobDetails.requirement.responsibility || "N/A"}
        </h4>
        <h4 className="text-lg font-semibold">
          {" "}
          <span className="text-xl font-bold">Benefits:</span>{" "}
          {jobDetails.requirement.benefits || "N/A"}
        </h4>
      </div>

      {/* Company Details */}
      <div className="md:mx-8 mx-2 border-l-2 p-2 md:p-4 rounded-lg border-sky-600 bg-sky-50 my-4">
        <h1 className="text-2xl font-semibold underline mb-3">
          Company Details:
        </h1>
        <h4 className="text-xl font-semibold">
          {" "}
          <span className="text-xl font-bold">Company Name:</span>{" "}
          {jobDetails.companyDetails.companyName || "N/A"}
        </h4>
        <h4 className="text-lg font-semibold my-2">
          {" "}
          <span className="text-xl font-bold">Company Type:</span>{" "}
          {jobDetails.companyDetails.type || "N/A"}
        </h4>
        <h4 className="text-lg font-semibold">
          {" "}
          <span className="text-xl font-bold">Head Office:</span>{" "}
          {jobDetails.companyDetails.headOffice || "N/A"}
        </h4>
        <h4 className="text-lg font-semibold my-2">
          {" "}
          <span className="text-xl font-bold">Work Area:</span>{" "}
          {jobDetails.companyDetails.workArea || "N/A"}
        </h4>
        <h4 className="text-lg font-semibold">
          {" "}
          <span className="text-xl font-bold">Contact Number:</span>{" "}
          {jobDetails.companyDetails.contact.mobileNo || "N/A"}
        </h4>
        <h4 className="text-lg font-semibold">
          {" "}
          <span className="text-xl font-bold">Email:</span>{" "}
          {jobDetails.companyDetails.contact.email || "N/A"}
        </h4>
        <h4 className="text-lg font-semibold">
          {" "}
          <span className="text-xl font-bold">Website:</span>{" "}
          {jobDetails.companyDetails.contact.website || "N/A"}
        </h4>
      </div>

      {/* Apply Process */}
      <div className="md:mx-8 mx-2 border-l-2 p-2 md:p-4 rounded-lg border-sky-600 bg-sky-50 my-4">
        <h1 className="text-2xl font-semibold underline mb-3">
          Apply Process:
        </h1>
        <h4 className="text-lg font-semibold">
          {" "}
          <span className="text-xl font-bold">Need To Do For Apply:</span>{" "}
          {jobDetails.applyProcess.needToDoForApply || "N/A"}
        </h4>
        <h4 className="text-lg font-semibold my-2">
          {" "}
          <span className="text-xl font-bold">Others:</span>{" "}
          {jobDetails.applyProcess.others || "N/A"}
        </h4>
      </div>
      {/*Action process */}
      <div className="md:mx-8 mx-2 border-l-2 p-2 md:p-4 rounded-lg border-sky-600 bg-sky-50 my-4 shadow-md">
        {/* Main container */}
        <div className=" md:flex justify-between items-center border rounded-lg p-4 ">
          {/* Left-side information */}
          <div className="flex flex-col space-y-2">
            <p className="text-lg text-gray-500">
              Posted on - <span className="text-teal-600">{jobDetails?.postedDate}</span>
            </p>
            <p className="text-lg font-semibold text-red-500">
              Deadline - <span className="text-red-500 animate-pulse ">{jobDetails?.deadline}</span>
            </p>
          </div>

          {/* Right-side buttons */}
          <div className="flex space-x-4 mt-4 text-sm md:text-xl">
            {/* Apply Button */}
            <button className="border border-gray-400 text-teal-700 hover:text-white hover:bg-teal-600 transition duration-300 px-6 py-2 rounded-lg font-semibold flex items-center space-x-2">
              <FcProcess className="w-5 h-5" />
              <span>Apply This Job</span>
            </button>

            {/* Save Job Button */}
            <button onClick={handleSaveJob} className="border border-gray-400 text-teal-700 hover:text-white hover:bg-teal-600 transition duration-300 px-6 py-2 rounded-lg font-semibold flex items-center space-x-2">
              <FaSave className="w-5 h-5" />
              <span>Save Job</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
