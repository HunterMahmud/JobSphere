import { FaBuilding, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import Image from 'next/image';

const CompanyCard = ({ company }) => {
  return (
    <div className="min-w-full mx-auto bg-white  ring ring-accent   shadow-lg rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="flex items-center p-5 border-b">
        {/* Company Logo */}
        <div className="w-20 h-20 bg-gray-200 rounded-full flex justify-center items-center overflow-hidden relative">
          <Image
            height={100}
            width={100}
            src={company?.companyInfo?.logo}
            alt={`${company?.companyInfo?.companyName} logo`}
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        {/* Company Name and Type */}
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-gray-800">{company?.companyInfo?.companyName}</h2>
          <p className="text-gray-500 flex items-center">
            <FaBuilding className="mr-1" />
            {company?.companyInfo?.companyType}
          </p>
        </div>
      </div>
      {/* Company Details */}
      <div className="p-5">
        <div className="text-gray-700 flex items-center mb-3">
          <FaMapMarkerAlt className="mr-2" />
          <span>{company?.companyInfo?.address}</span>
        </div>
        <div className="text-gray-700 flex items-center mb-5">
          <FaBriefcase className="mr-2" />
          <span>{company?.companyInfo?.typesOfJobs?.join(', ')}</span>
        </div>
        {/* View Details Button */}
        <div className="text-right">
          <button className="bg-primary text-white px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-hover hover:shadow-md">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
