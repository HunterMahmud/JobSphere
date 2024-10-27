"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  linearGradient,
  defs,
} from "recharts";

export default function JobPostingsChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/statistics/api/lineChart`
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
          totalPostedJobs: item.totalPostedJobs,
        }));

        setChartData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-[400px] flex flex-col justify-center items-center mb-8">
      <h2 className="text-2xl font-bold mb-4">Total Posted Jobs Per Week</h2>
      <AreaChart
        width={500}
        height={350}
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="week" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="totalPostedJobs"
          name="Total Posted Jobs"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
}

// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Line } from "react-chartjs-2";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function JobPostingsChart() {
//   const [chartData, setChartData] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/dashboard/statistics/api/lineChart`
//         );
//         const data = response.data;

//         // Array to map month numbers to month names
//         const monthNames = [
//           "January",
//           "February",
//           "March",
//           "April",
//           "May",
//           "June",
//           "July",
//           "August",
//           "September",
//           "October",
//           "November",
//           "December",
//         ];

//         // Creating labels combining week and month name
//         const labels = data.map(
//           (item) => `Week ${item.week} (${monthNames[item.month - 1]})`
//         );
//         const counts = data.map((item) => item.totalPostedJobs); // Ensure you extract the totalPostedJobs

//         setChartData({
//           labels,
//           datasets: [
//             {
//               label: "Jobs Posted Weekly",
//               data: counts,
//               borderColor: "rgba(75, 192, 192, 1)",
//               backgroundColor: "rgba(75, 192, 192, 0.2)",
//               borderWidth: 2,
//               tension: 0.4,
//             },
//           ],
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="h-[400px]">
//       {/* <h2 className="text-2xl font-bold text-center mb-4">
//         Weekly Job Postings
//       </h2> */}
//       {(chartData && chartData.labels) && (
//         <Line
//           data={chartData}
//           options={{
//             responsive: true,
//             plugins: {
//               legend: {
//                 display: true,
//                 position: "top",
//               },
//               title: {
//                 display: true,
//                 text: "Job Postings by Week",
//               },
//             },
//             scales: {
//               x: { title: { display: true, text: "Weeks (Month)" } },
//               y: { title: { display: true, text: "Number of Posted Jobs" } },
//             },
//           }}
//         />
//       )}
//     </div>
//   );
// }
