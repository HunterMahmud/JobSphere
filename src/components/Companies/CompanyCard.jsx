import { FaBuilding, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const CompanyCard = ({ company }) => {
  return (
    <div className="min-w-full mx-auto bg-white  ring ring-accent shadow-lg rounded-lg overflow-hidden duration-300 hover:shadow-2xl hover:scale-[1.01] transition-all">
      <div className="flex items-center p-3 border-b">
        {/* Company Logo */}
        <div className="w-24 h-24 bg-gray-200 rounded-full flex justify-start items-center overflow-hidden relative">
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
            <FaBuilding className="mr-1 text-secondary font-semibold" />
            {company?.companyInfo?.companyType}
          </p>
        </div>
      </div>
      {/* Company Details */}
      <div className="p-5">
        <div className="text-gray-700 flex items-center mb-3">
          <FaMapMarkerAlt className="mr-2 text-secondary font-semibold" />
          <span>{company?.companyInfo?.address}</span>
        </div>
        <div className="text-gray-700 flex items-center mb-5">
          <FaBriefcase className="mr-2 text-secondary font-semibold" />
          <span>{company?.employmentInfo?.typesOfJobs}</span>
        </div>
        {/* View Details Button */}
        <div className="text-center">
          <Link href={`companies/${company?._id}`}>
            <button className="w-full bg-primary bg-opacity-90z text-white px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-hover hover:shadow-md">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
