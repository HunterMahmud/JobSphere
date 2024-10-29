import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const db = await connectDB();
    console.log("Database connected successfully");
    const jobsCollection = db.collection("jobs");

    const result = await jobsCollection
      .aggregate([
        {
          // Add a new field for the week of the year and month
          $addFields: {
            weekOfYear: {
              $week: { $dateFromString: { dateString: "$postedDate" } },
            },
            month: {
              $month: { $dateFromString: { dateString: "$postedDate" } },
            },
          },
        },
        {
          $group: {
            _id: {
              week: "$weekOfYear", // Group by week of the year
              month: "$month", // Group by month
            },
            totalPostedJobs: { $sum: 1 }, // Count total jobs posted
          },
        },
        {
          $sort: { "_id.month": 1, "_id.week": 1 }, // Sort by month and week
        },
      ])
      .toArray();

    // console.log("Aggregation result:", result); // Log the aggregation result

    // Transform the result for line chart
    const data = result.map((item) => ({
      week: (item._id.week % 5) + 1, // Week number
      month: item._id.month, // Month number
      totalPostedJobs: item.totalPostedJobs, // Total jobs posted
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching jobs data:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching data" },
      { status: 500 }
    );
  }
};


export const dynamic = 'force-dynamic';