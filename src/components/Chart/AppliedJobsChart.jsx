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
    <div className="h-[400px] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">Total Applied Jobs Per Week</h2>
      <BarChart
        width={500}
        height={350}
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
    </div>
  );
}


// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
// } from "chart.js";

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// );

// export default function AppliedJobsChart() {
//     const [chartData, setChartData] = useState({});

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/statistics/api/BarChart`);
//                 const data = response.data;

//                 // const labels = data.map((item) => item.week);
//                 // Creating labels combining week and month name

//                         // Array to map month numbers to month names
//         const monthNames = [
//             "January",
//             "February",
//             "March",
//             "April",
//             "May",
//             "June",
//             "July",
//             "August",
//             "September",
//             "October",
//             "November",
//             "December",
//           ];

//         const labels = data.map(
//             (item) => `Week ${item.week} (${monthNames[item.month - 1]})`
//           );
//                 const counts = data.map((item) => item.totalAppliedJobs);

//                 setChartData({
//                     labels,
//                     datasets: [
//                         {
//                             label: "Applied Jobs Weekly",
//                             data: counts,
//                             backgroundColor: "rgba(153, 102, 255, 0.5)",
//                             borderColor: "rgba(153, 102, 255, 1)",
//                             borderWidth: 1,
//                         },
//                     ],
//                 });
//             } catch (error) {
//                 console.error("Error fetching applied jobs data:", error);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <div className="h-[400px]">
//             {/* <h2 className="text-2xl font-bold text-center mb-4">Weekly Applied Jobs</h2> */}
//             {(chartData && chartData.labels) && (
//                 <Bar
//                     data={chartData}
//                     options={{
//                         responsive: true,
//                         plugins: {
//                             legend: { display: true, position: "top" },
//                             title: { display: true, text: "Weekly Applied Jobs" },
//                         },
//                         scales: {
//                             x: { title: { display: true, text: "Weeks (Month)" } },
//                             y: { title: { display: true, text: "Number of Applied Jobs" } },
//                         },
//                     }}
//                 />
//             )}
//         </div>
//     );
// }
