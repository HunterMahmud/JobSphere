import { FaBuilding, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import Image from 'next/image';

const CompanyCard = ({company}) => {
  return (
    <div className="min-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
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
            {company?.companyInfo?.companyName}
          </p>
        </div>
      </div>
      {/* Company Details */}
      <div className="p-5">
        <div className="text-gray-700 flex items-center mb-3">
          <FaMapMarkerAlt className="mr-2" />
          <span>{company?.companyInfo?.address}</span>
        </div>
        <div className="text-gray-700 flex items-center">
          <FaBriefcase className="mr-2" />
          {/* <span>{typesOfJobs.join(', ')}</span> */}
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
