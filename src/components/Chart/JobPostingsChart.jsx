"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function JobPostingsChart() {
  const [chartData, setChartData] = useState({});

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

        // Creating labels combining week and month name
        const labels = data.map(
          (item) => `Week ${item.week} (${monthNames[item.month - 1]})`
        );
        const counts = data.map((item) => item.totalPostedJobs); // Ensure you extract the totalPostedJobs

        setChartData({
          labels,
          datasets: [
            {
              label: "Jobs Posted Weekly",
              data: counts,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">
        Weekly Job Postings
      </h2>
      {chartData && chartData.labels ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
              title: {
                display: true,
                text: "Job Postings by Week",
              },
            },
            scales: {
              x: { title: { display: true, text: "Weeks (Month)" } },
              y: { title: { display: true, text: "Number of Posted Jobs" } },
            },
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
}
