"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BsArrowUpRight, BsArrowDownRight, BsDash } from "react-icons/bs";
import { useSession } from 'next-auth/react';

export default function UserProgress() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const session = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/api/user-progress?email=${session?.data?.user?.email}`);
        setUserData(response?.data);
      } catch (error) {
        console.error("Failed to load user data", error);
      } finally {
        setLoading(false);
      }
    };
    if (session?.status === 'authenticated') {
      fetchUserData();
    }
  }, [session?.status]);

  if (loading) return <p className="text-center">Loading...</p>;

  const renderProgressIcon = (progress) => {
    if (progress === 'growth') return <BsArrowUpRight className="text-green-500" />;
    if (progress === 'decline') return <BsArrowDownRight className="text-red-500" />;
    return <BsDash className="text-yellow-500" />;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white shadow rounded-lg p-4 text-center">
        <h3 className="text-lg font-semibold">Profile Completion</h3>
        <p className={`text-4xl font-bold ${userData?.profileCompletion > 75 ? "text-green-500" : "text-red-500"}`}>
          {userData?.profileCompletion}%
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
        {Object.entries(userData?.jobStatusCounts).map(([status, count]) => (
          <div key={status} className="bg-white shadow rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold">{status}</h3>
            <p className="text-2xl font-bold">{count}</p>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Progress</h3>
        <div className="text-2xl">{renderProgressIcon(userData?.progressTrend)}</div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Progress Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userData?.progressData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="progress" fill="#4A90E2" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Applications Over Time */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Applications Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userData?.applicationsData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="applications" fill="#FF7043" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}






/*
"use client"
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, ResponsiveContainer } from "recharts";
import Select from "react-select";
import axios from "axios";
import { useSession } from 'next-auth/react';

const ProgressDashboard = () => {
  const [applicationsData, setApplicationsData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [selectedRange, setSelectedRange] = useState("daily");
  const [progress, setProgress] = useState(0);
  const [previousProgress, setPreviousProgress] = useState(0);
  const [compareRange, setCompareRange] = useState("daily");
  const session = useSession();
//   console.log(session)

  const fetchApplicationsData = async (range) => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/api/jobs/applications?email=${session?.data?.user?.email}&range=${range}`);
    // console.log("the result: ",res)
    console.log(data.applications)
    // setApplicationsData(res.data);
  };

  const fetchStatusData = async () => {
    const res = await axios.get(`/api/jobs/progress?email=${session.data?.user?.email}`);
    setStatusData(res.data.statuses);
    setProgress(calculateProgress(res.data.statuses));
  };

  const fetchComparisonData = async (range) => {
    const res = await axios.get(`/api/jobs/progress-comparison?email=${session.data?.user?.email}&range=${range}`);
    setPreviousProgress(calculateProgress(res.data));
  };

  useEffect(() => {
    if(session.data?.user?.email){
        fetchApplicationsData(selectedRange);
        // fetchStatusData();
        // fetchComparisonData(compareRange);
    }
  }, [selectedRange, compareRange, session?.status]);

  console.log(applicationsData)
  const rangeOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  return (
    <div className="p-4 md:ml-64">
      <h1 className="text-xl font-bold mb-4">Application Progress Dashboard</h1>
      
      <div className="flex gap-4 mb-4">
        <Select
          options={rangeOptions}
          value={rangeOptions.find(opt => opt.value === selectedRange)}
          onChange={(opt) => setSelectedRange(opt.value)}
          className="w-1/3"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card bg-blue-500 text-white p-4 rounded-lg">
          <h2>Applied Jobs</h2>
          <p className="text-2xl font-bold">{applicationsData.length}</p>
        </div>
        <div className="card bg-green-500 text-white p-4 rounded-lg">
          <h2>Progress</h2>
          <p className="text-2xl font-bold">{progress.toFixed(1)}%</p>
        </div>
      </div>
      
 
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Compare Progress</h2>
        <Select
          options={rangeOptions}
          value={rangeOptions.find(opt => opt.value === compareRange)}
          onChange={(opt) => setCompareRange(opt.value)}
          className="w-1/3 mb-4"
        />
        <div className="card bg-purple-500 text-white p-4 rounded-lg">
          <h3>Previous Progress ({compareRange})</h3>
          <p className="text-2xl font-bold">{previousProgress.toFixed(1)}%</p>
          <p className={`text-lg font-semibold ${progress > previousProgress ? "text-green-500" : "text-red-500"}`}>
            {progress > previousProgress ? "Increased" : "Decreased"} by {(Math.abs(progress - previousProgress)).toFixed(1)}%
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={applicationsData}>
          <XAxis dataKey="jobTitle" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="applications" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={statusData}>
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressDashboard;


*/
