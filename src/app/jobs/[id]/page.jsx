"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBookmark, FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaBuilding, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa'; // Icons from react-icons
import { useSession } from "next-auth/react";
import Loader from "@/app/loading";
import Swal from "sweetalert2";

const JobDetails = ({ params }) => {
  const [job, setJob] = useState(null); // State to store job details
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors
  const { data: session } = useSession();
  const [message ,setMessage] =useState() 

  

  const getServicesDetails = async (id) => {
    try {
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/jobs/api/${id}`);
      return data.job;
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
        setJob(details);
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
  if (!job) {
    return <div>No job details available.</div>;
  }


  const handleApplyJob = () => {
    window.location.href = `/apply-job/${id}`;
  };

  const handleSaveJob = async()=>{
    const newJob ={user :session?.user , job}
    try {
      // Use axios to make the POST request
      const response = await axios.post("/api/saveJob", newJob, {
        headers: {
          "Content-Type": "application/json", // Set the content type
        },
      });

      Swal.fire({
        position: "top",
        icon: "success",
        title: "Job Added Successfully",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          // If job already exists, set a custom message
          Swal.fire({
            position: "top",
            icon: "info",
            title: "Job already Saved!",
            showConfirmButton: false,
            timer: 1500
          });
        
        } else {
          Swal.fire({
            position: "top",
            icon: "info",
            title:`Failed to add job: ${error?.response?.data?.message}`,
            showConfirmButton: false,
            timer: 1500
          });
         
        }
      } else if (error.request) {
        // The request was made, but no response was received
        setMessage("No response from server. Please try again.");
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        setMessage("Error occurred: " + error.message);
        console.error("Error:", error.message);
      }
    }
    
  }

 

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-100">
      {/* Job Details Section */}
      <div className="bg-white shadow-md p-6 rounded-lg mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-4">
            <img src={job?.compnayInforamtion?.companyInfo?.logo} alt="Company Logo" className="w-16 h-16 rounded-full" />
            <div>
              <h2 className="text-2xl font-bold">{job?.jobTitle}</h2>
              <p className="text-gray-500">{job?.compnayInforamtion?.companyInfo?.companyName}</p>
            </div>
          </div>
          <button
            onClick={handleSaveJob}
            className="flex items-center text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            <FaBookmark className="w-5 h-5 mr-2" />
            Save Job
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center">
            <FaMapMarkerAlt className="w-5 h-5 mr-2 text-gray-500" />
            <span>{job?.locationType || 'Not specified'}</span>
          </div>
          <div className="flex items-center">
            <FaBriefcase className="w-5 h-5 mr-2 text-gray-500" />
            <span>{job?.jobType || 'Not specified'}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold mr-2">$</span>
            <span>{job?.salaryScale || 'Salary not specified'}</span>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="w-5 h-5 mr-2 text-gray-500" />
            <span>Posted on: {new Date(job?.postedDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <FaClock className="w-5 h-5 mr-2 text-gray-500" />
            <span>Deadline: {new Date(job?.deadline).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg">Responsibilities</h3>
          <p className="text-gray-700 whitespace-pre-line">{job?.responsibility}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg">Requirements</h3>
          <ul className="list-disc list-inside">
            <li>Education: {job?.education}</li>
            <li>Experience: {job?.experience} years</li>
            <li>{job?.additionalRequirements}</li>
          </ul>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleApplyJob}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Apply Now
          </button>
          <p className="text-gray-500">{job?.applicantsNumber || 0} applicants</p>
        </div>
      </div>

      {/* Company Details Section */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <div className="flex items-start space-x-4 mb-4">
          <FaBuilding className="w-8 h-8 text-gray-500" />
          <div>
            <h3 className="text-xl font-bold">About {job?.compnayInforamtion?.companyInfo?.companyName}</h3>
            <p className="text-gray-500">{job?.compnayInforamtion?.companyInfo?.companyMission}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <p><strong>Company Type:</strong> {job?.compnayInforamtion?.companyInfo?.companyType}</p>
            <p><strong>Founded:</strong> {job?.compnayInforamtion?.companyInfo?.foundedYear}</p>
            <p><strong>Size:</strong> {job?.compnayInforamtion?.employmentInfo?.companySize} employees</p>
          </div>
          <div>
            <p><strong>Address:</strong> {job?.compnayInforamtion?.companyInfo?.address}, {job?.compnayInforamtion?.companyInfo?.city}, {job?.compnayInforamtion?.companyInfo?.country}</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <FaEnvelope className="w-6 h-6 text-gray-500" />
          <div>
            <p>{job?.compnayInforamtion?.contactInformation?.email}</p>
          </div>
        </div>
        <div className="flex items-start space-x-4 mt-4">
          <FaPhone className="w-6 h-6 text-gray-500" />
          <div>
            <p>{job?.compnayInforamtion?.contactInformation?.phone}</p>
          </div>
        </div>
        <div className="flex items-start space-x-4 mt-4">
          <FaGlobe className="w-6 h-6 text-gray-500" />
          <a href={job?.compnayInforamtion?.contactInformation?.website} className="text-blue-600" target="_blank" rel="noreferrer">
            {job?.compnayInforamtion?.contactInformation?.website}
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
