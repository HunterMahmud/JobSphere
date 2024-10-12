import Link from "next/link";
import React from "react";

const JobCard = ({ job }) => {
  const {
    _id,
    postedDate,
    deadline,
    skills,
  } = job;
  console.log(job);
  return (
    <div>
    <div className="card bg-sky-50 shadow-2xl p-6 rounded-xl border-l-4 border-slate-800 flex flex-col justify-between hover:border-2 hover:border-sky-500 box-border h-[350px]">
      <div className="card-body">
        <h2 className="card-title text-xl font-semibold animate-pulse">
          {job?.summary?.jobTitle}
        </h2>
        <p className="text-gray-700 font-medium">
          {job?.companyDetails?.companyName}
        </p>
        <div className="text-gray-600 mt-2">
          <p>
            <span className="font-bold">Job Type:</span>{" "}
            {job?.companyDetails?.type}
          </p>
          <p>
            <span className="font-bold">Experience Need:</span>{" "}
            {job?.requirement?.experience}
          </p>
          <p>
            <span className="font-bold">Posted Date:</span> {postedDate}
          </p>
          <p>
            <span className="font-bold">Deadline:</span> {deadline}
          </p>
        </div>
        <div className="mt-4">
          <p className="font-bold">Skill need:</p>
          <div className="space-x-2 mt-2 flex flex-wrap gap-1">
            {skills?.map((skill, index) => (
              <span
                key={index}
                className="badge badge-outline badge-primary bg-blue-200 px-3 rounded-lg border-2 border-blue-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <button className="bg-purple-600 btn hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg w-auto">
          <Link href={`/jobs/${_id}`}>View Details</Link>
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default JobCard;
