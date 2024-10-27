import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const db = await connectDB();
    console.log("Database connected successfully");
    const appliedJobsCollection = db.collection("applyedJobs");

    const result = await appliedJobsCollection
      .aggregate([
        {
          // Add fields to extract the week of the year and month from `applicationDate`
          $addFields: {
            weekOfYear: {
              $week: { $dateFromString: { dateString: "$applicationDate" } },
            },
            month: {
              $month: { $dateFromString: { dateString: "$applicationDate" } },
            },
          },
        },
        {
          $group: {
            _id: {
              week: "$weekOfYear", // Group by week of the year
              month: "$month", // Group by month
            },
            totalAppliedJobs: { $sum: 1 }, // Count the total applied jobs
          },
        },
        {
          $sort: { "_id.month": 1, "_id.week": 1 }, // Sort by month and week
        },
      ])
      .toArray();

    console.log("Aggregation result:", result); // Log the aggregation result

    // Transform the result for line or bar chart
    const data = result.map((item) => ({
      week: (item._id.week % 5) + 1, // Week number for resetting within each month
      month: item._id.month, // Month number
      totalAppliedJobs: item.totalAppliedJobs, // Total jobs applied for that week
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching applied jobs data:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching data" },
      { status: 500 }
    );
  }
};
