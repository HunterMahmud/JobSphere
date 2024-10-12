import Link from "next/link";
import React from "react";

const JobCard = ({ job }) => {
  const {
    _id,
    postedDate,
    deadline,
    skills,
  } = job;

  return (
    <div>
      <div className="card mx-3 bg-sky-50 shadow-2xl p-6 rounded-xl border-l-4 border-slate-800 flex flex-col justify-between hover:border-2 hover:border-sky-500 box-border h-min-[350px]">
        <div className="card-body">
          <h2 className="card-title text-xl font-semibold animate-pulse">
            {job?.jobTitle}
          </h2>
          <p className="text-gray-700 font-medium">
            {job?.compnayInforamtion?.companyInfo?.companyName}
          </p>
          <div className="text-gray-600 mt-2">
            <p>
              <span className="font-bold">Job Type:</span>{" "}
              {job?.jobType}
            </p>
            <p>
              <span className="font-bold">Experience Need:</span>
            <span className=" font-extrabold">  {job?.experience}</span>
            </p>
            <p>
              <span className="font-bold">Posted Date:</span> {new Date(postedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true // For 12-hour format, set to false for 24-hour format
              })}
            </p>
            <p>
              <span className="font-bold">Deadline:</span>{new Date(deadline).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true // For 12-hour format, set to false for 24-hour format
              })}
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
