import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CompanyCard = ({ company }) => {

    const {name,salaryScales, logo, typesOfJobs} = company;

    return (
        <div>
            <div>
      <div className="bg-sky-50 shadow-2xl p-6 rounded-xl border-l-4 border-sky-600 flex flex-col justify-between hover:border-2 hover:border-sky-500 box-border h-auto">
        <div className="">
            <div>
                <Image src={logo} alt='Logo' width={300} height={300} className='rounded-xl border-2 border-sky-400 mx-auto'></Image>
                <h1 className='text-2xl font-semibold animate-pulse text-center mt-2'>{name}</h1>
            </div>
          <h2 className="text-xl font-semibold animate-pulse">
            
          </h2>
          <p className="text-gray-700 font-medium">
            
          </p>
          <div className="text-gray-600 mt-2">
            <p>
              <span className="font-bold">Job Type:</span>{" "}
              
            </p>
            <p>
              <span className="font-bold">Experience Need:</span>{" "}
              
            </p>
            <p>
              <span className="font-bold">Salary Scale:{salaryScales.SoftWare Engineer}</span> 
            </p>
            <p>
              <span className="font-bold">Deadline:</span> 
            </p>
          </div>
          <div className="mt-4">
            <p className="font-bold">Skill need:</p>
            <div className="space-x-2 mt-2 flex flex-wrap gap-1">
              {typesOfJobs.map((type, index) => (
                <span
                  key={index}
                  className="badge badge-outline  badge-primary bg-sky-100 px-3 py-1 rounded-lg border-2 border-blue-400"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <button className="bg-sky-500 btn hover:bg-sky-700 text-white   font-semibold py-2 px-6 rounded-lg w-auto">
            <Link href={`/jobs`}>View Posted Jobs</Link>
          </button>
        </div>
      </div>
    </div>
        </div>
    );
};

export default CompanyCard;