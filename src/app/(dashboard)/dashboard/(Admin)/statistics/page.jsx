"use client";

import JobPostingsChart from "@/components/Chart/JobPostingsChart";
import AppliedJobsChart from "@/components/Chart/AppliedJobsChart";
import OverviewCard from "@/components/OverviewCard/OverviewCard";
import { useSession } from "next-auth/react";

const Statistics = () => {
  const seasons = useSession();
  return (
    <div className="container mx-auto px-2 md:px-4">
      <div className="text-center w-full">
        <h1 className="text-center py-4 bg-gradient-to-r from-[#007ACC] via-[#0f7fca] to-[#3C4757] bg-clip-text md:text-5xl font-extrabold text-transparent text-4xl">
          Welcome{" "}
          <span className="bg-opacity-90">{seasons?.data?.user?.name}, to</span>
          <span className="block md:text-3xl text-2xl mt-6">
            Admin Dashboard Overview
          </span>
        </h1>
        <p className="text-center md:text-2xl text-lg font-semibold text-gray-600 my-4">
          Track all essential statistics and insights here to keep the platform
          running smoothly
        </p>
      </div>

      <div>
        <OverviewCard />
      </div>
      <div className="lg:flex gap-6">
        <JobPostingsChart />
        <AppliedJobsChart />
      </div>
    </div>
  );
};

export default Statistics;
