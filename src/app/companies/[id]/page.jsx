"use client"
import { FaPhone, FaEnvelope, FaLinkedin, FaTwitter, FaGlobe, FaBuilding, FaMapMarkerAlt, FaUsers, FaBriefcase, FaExternalLinkAlt } from "react-icons/fa"; // Added more icons
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
  return (

    <div className="custom-container p-8 bg-opacity-50 bg-accent shadow-lg rounded-lg my-10 ">

      <div className="p-6 bg-gradient-to-r from-green-400 to-green-600 text-white">
        <div className="flex items-center">
          {company?.companyInfo?.logo && (
            <div className="relative w-32 h-32">
              <Image
                src={company.companyInfo.logo}
                alt={`${company?.companyInfo?.companyName} Logo`}
                layout="fill"
                objectFit="contain"
                className="rounded-full"
              />
            </div>
          )}
          <div className="ml-6">
            <h1 className="text-4xl font-bold">
              {company?.companyInfo?.companyName || "Company Name"}
            </h1>
            <p className="text-lg mt-2">
              {company?.companyInfo?.companyMission || "Company mission"}
            </p>
            <div className="flex space-x-4 mt-2">
              <span>Founded: {company?.companyInfo?.foundedYear || "N/A"}</span>
              <span>Company Size: {company?.employmentInfo?.companySize || "N/A"} employees</span>
              <span>Location: {company?.companyInfo?.address || "Unknown"}</span>
            </div>
          </div>
          {company?.contactInformation?.website && (
            <a
              href={company.contactInformation.website}
              className="ml-auto bg-white text-green-700 px-4 py-2 rounded inline-flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website <FaExternalLinkAlt className="ml-2" />
            </a>
          )}
        </div>
      </div>
      <div className="p-8">
        <h2 className="text-3xl font-semibold">
          About {company?.companyInfo?.companyName || "the Company"}
        </h2>
        <p className="mt-4 text-gray-600">
          {company?.companyInfo?.companyMission || "This company aims to create a better future."}
        </p>
      </div>

      <div className="p-8 bg-gray-100">
        <h2 className="text-3xl font-semibold">Employment Opportunities</h2>
        <div className="mt-4 text-gray-600">
          <p>Types of Jobs: {company?.employmentInfo?.typesOfJobs || "N/A"}</p>
          <p>Company Size: {company?.employmentInfo?.companySize || "N/A"} employees</p>
        </div>
      </div>


      <div className="p-8">
        <h2 className="text-3xl font-semibold">Contact Information</h2>
        <div className="mt-4 space-y-2">
          {company?.contactInformation?.phone && (
            <div className="flex items-center">
              <FaPhone className="text-green-600 mr-2" />
              <p className="text-gray-600">{company.contactInformation.phone}</p>
            </div>
          )}
          {company?.contactInformation?.email && (
            <div className="flex items-center">
              <FaEnvelope className="text-green-600 mr-2" />
              <p className="text-gray-600">{company.contactInformation.email}</p>
            </div>
          )}
          {company?.contactInformation?.socialLinks?.linkedin && (
            <div className="flex items-center">
              <FaLinkedin className="text-green-600 mr-2" />
              <a
                href={company.contactInformation.socialLinks.linkedin}
                className="text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          )}
          {company?.contactInformation?.socialLinks?.twitter && (
            <div className="flex items-center">
              <FaTwitter className="text-green-600 mr-2" />
              <a
                href={company.contactInformation.socialLinks.twitter}
                className="text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default DetailedCompanyPage;
