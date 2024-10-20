"use client"
import { FaPhone, FaEnvelope, FaLinkedin, FaTwitter, FaMapMarkerAlt, FaUsers, FaExternalLinkAlt, FaCalendarAlt } from "react-icons/fa"; // Added more icons
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "@/app/loading";
import axios from "axios";

const DetailedCompanyPage = ({ params }) => {
  const [loading, setLoading] = useState(true)
  const [company, setCompany] = useState()

  useEffect(() => {
    const fetchJobs = async (id) => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/companies/api/${id}`
        );
        setCompany(data?.company);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };
    fetchJobs(params.id); // Fetch jobs when page or search changes
  }, []);

  if (loading) {
    return <Loader />
  }
  if (!company) {
    return <h2 className="text-2xl font-bold text-center pt-14">No Data Found</h2>
  }
  const jobTypes = company?.employmentInfo?.typesOfJobs?.split(",") || ["N/A"];
  return (

    <div className="custom-container my-10 ">
      <div className="relative bg-cover bg-center rounded-lg h-96" style={{ backgroundImage: `url('https://via.placeholder.com/1200x400')` }}>
        <div className="absolute rounded-lg inset-0 bg-primary bg-opacity-80   flex items-center justify-center">
          <div className="text-center text-white">
            <img
              src={company?.companyInfo?.logo || "/default-logo.png"}
              alt={company?.companyInfo?.companyName}
              className="w-24 h-24 mx-auto mb-4 rounded-full bg-white p-2"
            />
            <h1 className="text-5xl font-bold">{company?.companyInfo?.companyName || "Company Name"}</h1>
            <p className="text-lg mt-2">{company?.companyInfo?.companyMission || "Company Mission Statement"}</p>
            {company?.contactInformation?.website && (
              <a
                href={company?.contactInformation?.website}
                className="flex justify-center items-center w-1/2 mx-auto bg-secondary hover:bg-green-600 text-white mt-4 px-6 py-3 rounded-md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website <FaExternalLinkAlt className="ml-2" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="bg-accent rounded-lg px-6 py-8 mt-10">
        <h2 className="text-3xl font-semibold text-center mb-8">Statistics</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Founded Year */}
          <div className="bg-white shadow p-6 text-center rounded-lg">
            <FaCalendarAlt className="text-secondary text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-bold">Founded</h3>
            <p className="mt-2 text-gray-600">{company?.companyInfo?.foundedYear || "N/A"}</p>
          </div>

          {/* Company Size */}
          <div className="bg-white shadow p-6 text-center rounded-lg">
            <FaUsers className="text-primary text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-bold">Company Size</h3>
            <p className="mt-2 text-gray-600">{company?.employmentInfo?.companySize || "N/A"} employees</p>
          </div>

          {/* Location */}
          <div className="bg-white shadow p-6 text-center rounded-lg">
            <FaMapMarkerAlt className="text-red-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-bold">Location</h3>
            <p className="mt-2 text-gray-600">{company?.companyInfo?.address || "N/A"}</p>
          </div>

        </div>
      </div>


      <div className="py-12 bg-gray-200 my-5 rounded-lg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center">About {company?.companyInfo?.companyName || "Our Company"}</h2>
          <p className="mt-6 text-gray-600 text-lg leading-relaxed text-center">
            {company?.companyInfo?.companyMission ||
              "Our mission is to lead in agricultural innovation and sustainable farming practices. We are dedicated to improving the quality of food production and research."}
          </p>
        </div>
      </div>

      <div className="py-12 bg-accent rounded-lg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">Job Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobTypes.map((job, index) => (
              <div key={index} className="bg-white p-6 shadow-lg rounded-lg">
                <h3 className="text-xl font-bold">{job}</h3>
                <p className="text-gray-600 mt-2">Explore a career in {job.trim()} with Green Earth Agro, where innovation meets sustainability.</p>
              </div>
            ))}
          </div>
        </div>
      </div>



      <div className="py-12 bg-gray-200 my-8 rounded-lg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center">Get in Touch</h2>
          <div className="mt-8 flex flex-col space-y-4 items-center text-gray-600">
            {company?.contactInformation?.phone && (
              <div className="flex items-center">
                <FaPhone className="text-secondary mr-2" />
                {company.contactInformation.phone}
              </div>
            )}
            {company?.contactInformation?.email && (
              <div className="flex items-center">
                <FaEnvelope className="text-primary mr-2" />
                {company.contactInformation.email}
              </div>
            )}
            <div className="flex space-x-4">
              {company?.contactInformation?.socialLinks?.linkedin && (
                <a
                  href={company.contactInformation.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900"
                >
                  <FaLinkedin className="text-3xl" /> {/* Larger LinkedIn icon */}
                </a>
              )}
              {company?.contactInformation?.socialLinks?.twitter && (
                <a
                  href={company.contactInformation.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600"
                >
                  <FaTwitter className="text-3xl" /> {/* Larger Twitter icon */}
                </a>
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default DetailedCompanyPage;
