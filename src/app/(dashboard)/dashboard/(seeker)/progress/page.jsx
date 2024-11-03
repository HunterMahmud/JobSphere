"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useSession } from "next-auth/react";
import Select from "react-select";
import { MdOutlineTrendingDown, MdOutlineTrendingUp, MdTrendingFlat } from "react-icons/md";
import Link from 'next/link';
import Loader from '@/app/loading';



export default function UserProgress() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progressView, setProgressView] = useState("daily"); // Daily or weekly view for progress chart
  const [applicationsView, setApplicationsView] = useState("daily"); // Daily or weekly view for applications chart

  const session = useSession();


  const options = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
  ];

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/api/user-progress?email=${session?.data?.user?.email}&progressView=${progressView}&applicationsView=${applicationsView}`
      );
      setUserData(response?.data);

    } catch (error) {
      console.error("Failed to load user data", error);
    } finally {
      setLoading(false);

    }
  };

  useEffect(() => {
    if (session?.status === "authenticated") {
      fetchUserData();
    }
  }, [session?.status, progressView, applicationsView]);


  if (loading) return <Loader />;
  // <p className="text-center">Loading...</p>;

  // setApplications(userData?.applicationsData.map(data => data.date.slice(-2)));

  // const calculateProgress = (progressData) => {
  //   if (progressData.length >= 2) {
  //     const last = progressData[progressData.length - 1].points;
  //     const secondLast = progressData[progressData.length - 2].points;
  //     const difference = last - secondLast;
  //     if (difference > 0) return "Progressing";
  //     if (difference < 0 || last === 0 || secondLast === 0) return "Downfalling";
  //     return "Not Progressing";
  //   } else {
  //     return "No data available";
  //   }
  // };

  // Function to render progress icon and apply appropriate color
  // const renderProgressIcon = (progress) => {
  //   if (progress === "Progressing") return <MdOutlineTrendingUp className="text-green-400 text-6xl" />;
  //   if (progress === "Downfalling") return <MdOutlineTrendingDown className="text-red-500 text-6xl" />;
  //   return <MdTrendingFlat className="text-orange-500 text-6xl" />;
  // };

  // console.log(userData?.progressData);
  // const progressStatus = calculateProgress(userData?.progressData);

  // // Determine card colors based on progress status
  // const cardColor =
  //     progressStatus === "Progressing"
  //         ? "bg-gradient-to-r from-teal-900 to-teal-800"
  //         : progressStatus === "Downfalling"
  //         ? "bg-gradient-to-r from-red-900 to-red-800"
  //         : "bg-gradient-to-r from-yellow-900 to-yellow-800";

  // const buttonColor =
  //     progressStatus === "Progressing" ? "bg-green-400 hover:bg-green-500" : progressStatus === "Downfalling" ? "bg-red-500 hover:bg-red-600" : "bg-yellow-500 hover:bg-yellow-600";


  return (
    <div className="custom-container space-y-6">
      {/* Profile Completion Card */}
      {/* <div className={` ${userData?.profileCompletion > 75 ? "bg-gradient-to-r from-[#00bf8f]  to-[#005741]" : "bg-gradient-to-r from-orange-900 to-orange-800"}  shadow rounded-lg p-4 text-center`}>
        <h3 className="text-lg font-semibold text-white">Profile Completion</h3>
        <p className={`text-4xl font-bold text-white`}>
          {userData?.profileCompletion}%
        </p>
      </div> */}

      {/* progress track */}
      {/* <div className={`flex items-center justify-between ${cardColor} rounded-lg p-8 w-full text-white shadow-lg`}>
        <div className="flex-1 pr-6">
          <h2 className="text-2xl font-bold">
            {progressStatus === "Progressing" && "You're doing Excellent! Keep it up!"}
            {progressStatus === "Downfalling" && "Things aren't going well, let's improve!"}
            {progressStatus === "Not Progressing" && "You're stable, but let's aim higher!"}
          </h2>
          <p className="mt-2 text-sm">
            Keep engaged and do hard work for your goal. To apply jobs.
          </p>
          <div className='mt-4'>
            <Link href={`/jobs`} className={`mt-4 ${buttonColor} text-white px-6 py-2 rounded-md font-medium transition duration-300`}>
              Continue ➔
            </Link>
          </div>
        </div>
        <div className="w-16 h-16 flex items-center justify-center">
          {renderProgressIcon(progressStatus)}
        </div>
      </div> */}
      <div className="flex-1 pr-6">
        <h2 className="text-2xl font-bold">
          Hi, {session?.data?.user?.name || "Job Seeker"}
        </h2>
        <p className="mt-2 text-sm">
          Keep engaged and do hard work for your goal.
        </p>

      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Saved Jobs</h3>
          <p className="text-2xl font-bold">{userData?.savedJobsCount}</p>
        </div>
        {Object.entries(userData?.jobStatusCounts).map(([status, count]) => (
          <div key={status} className="bg-white shadow rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold">{status}</h3>
            <p className="text-2xl font-bold">{count}</p>
          </div>
        ))}
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Total Points</h3>
          <p className="text-2xl font-bold">{(userData?.totalPoints * 10).toFixed(1)}</p>
        </div>
      </div>


      {/* Progress Over Time */}
      <div className="bg-white shadow rounded-lg p-6 pl-0">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold pl-2 md:pl-6">Progress Over Time</h3>
          <Select
            options={options}
            value={options.find(option => option.value === progressView)}
            onChange={(selected) => setProgressView(selected.value)}
            placeholder="Select View"
          />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={userData?.progressData}>
            <XAxis
              dataKey="date"
              tickFormatter={(date) => date.slice(-2)} // Custom formatter to get last two characters
            />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="points" stroke="#4A90E2" fill="#004585" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Applications Over Time */}
      <div className="bg-white shadow rounded-lg p-6 pl-0">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold pl-2 md:pl-6">Applications Over Time</h3>
          <Select
            options={options}
            value={options.find(option => option.value === applicationsView)}
            onChange={(selected) => setApplicationsView(selected.value)}
            placeholder="Select View"
          />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userData?.applicationsData}>
            <XAxis
              dataKey="date"
              tickFormatter={(date) => date.slice(-2)} // Custom formatter to get last two characters
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="applications" fill="#2557a7" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
