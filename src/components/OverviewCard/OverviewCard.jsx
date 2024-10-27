"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  BriefcaseIcon,
  UserGroupIcon,
  UserIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/solid"; // Updated path for Heroicons v2

export default function OverviewCard() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    liveJobs: 0,
    totalRecruiters: 0,
    totalSeekers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/statistics/api/Overview`
        );

        console.log(response)
        const data = response.data;

        setStats({
          totalJobs: data.totalJobs,
          liveJobs: data.liveJobs,
          totalRecruiters: data.totalRecruiters,
          totalSeekers: data.totalSeekers,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow">
          <div className="bg-blue-100 p-2 rounded-full">
            <BriefcaseIcon className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Jobs</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.totalJobs}</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow">
          <div className="bg-green-100 p-2 rounded-full">
            <DocumentCheckIcon className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Live Jobs</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.liveJobs}</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow">
          <div className="bg-purple-100 p-2 rounded-full">
            <UserGroupIcon className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Recruiters</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.totalRecruiters}</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow">
          <div className="bg-orange-100 p-2 rounded-full">
            <UserIcon className="h-8 w-8 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Seekers</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.totalSeekers}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
