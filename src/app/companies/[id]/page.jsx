"use client"
import { FaPhone, FaEnvelope, FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";
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
    <div className="custom-container">
      <div className="max-w-4xl mx-auto p-8 bg-opacity-50 bg-accent shadow-lg rounded-lg my-10 ">
        {/* Header */}
        <div className="flex items-center space-x-4">
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
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{company?.companyInfo?.companyName || "N/A"}</h1>
            <p className="text-sm text-gray-500">{company?.companyInfo?.companyMission || "N/A"}</p>
          </div>
        </div>

        {/* Company Information */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Company Information</h2>
          <p className="text-gray-600">
            <span className="font-medium">Founded Year:</span> {company?.companyInfo?.foundedYear || "N/A"}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Type:</span> {company?.companyInfo?.companyType || "N/A"}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Address:</span> {company?.companyInfo?.address || "N/A"}, {company?.companyInfo?.city || "N/A"}, {company?.companyInfo?.country || "N/A"}
          </p>
        </div>

        {/* Contact Information */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact Information</h2>
          <p className="text-gray-600 flex items-center space-x-2">
            <FaEnvelope /> <span>{company?.contactInformation?.email || "N/A"}</span>
          </p>
          <p className="text-gray-600 flex items-center space-x-2">
            <FaPhone /> <span>{company?.contactInformation?.phone || "N/A"}</span>
          </p>
          <p className="text-gray-600 flex items-center space-x-2">
            <FaGlobe />{" "}
            <a href={company?.contactInformation?.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {company?.contactInformation?.website || "N/A"}
            </a>
          </p>
          <div className="flex space-x-4 mt-2">
            {company?.contactInformation?.socialLinks?.linkedin && (
              <a href={company.contactInformation.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-blue-600" size={24} />
              </a>
            )}
            {company?.contactInformation?.socialLinks?.twitter && (
              <a href={company.contactInformation.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-blue-400" size={24} />
              </a>
            )}
          </div>
        </div>

        {/* Employment Information */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Employment Information</h2>
          <p className="text-gray-600">
            <span className="font-medium">Company Size:</span> {company?.employmentInfo?.companySize || "N/A"}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Jobs Offered:</span> {company?.employmentInfo?.typesOfJobs || "N/A"}
          </p>
        </div>
      </div>
    </div>


  );
};

export default DetailedCompanyPage;
