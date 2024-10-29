"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AppliedJobsChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/statistics/api/BarChart`
        );
        const data = response.data;

        // Array to map month numbers to month names
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        // Transform data with custom week labels
        const transformedData = data.map((item) => ({
          week: `Week ${item.week} (${monthNames[item.month - 1]})`,
          totalAppliedJobs: item.totalAppliedJobs,
        }));

        setChartData(transformedData);
      } catch (error) {
        console.error("Error fetching applied jobs data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-[400px] w-full flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">Total Applied Jobs Per Week</h2>
        <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalAppliedJobs" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

