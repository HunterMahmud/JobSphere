// app/dashboard/statistics/api/overview/route.js
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const db = await connectDB();
    console.log("Database connected successfully");

    // Collections
    const jobsCollection = db.collection("jobs");
    const recruitersCollection = db.collection("recruiter");
    const seekersCollection = db.collection("users");

    // Aggregating Data
    const totalJobs = await jobsCollection.countDocuments();
    const liveJobs = await jobsCollection.countDocuments({
      $expr: {
        $gt: [
          { $dateFromString: { dateString: "$deadline" } }, // Convert deadline to Date
          new Date(), // Compare with the current date
        ],
      },
    });

    const totalRecruiters = await recruitersCollection.countDocuments();
    const totalSeekers = await seekersCollection.countDocuments();

    // Result Structure
    const data = {
      totalJobs,
      liveJobs,
      totalRecruiters,
      totalSeekers,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching dashboard statistics:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching data" },
      { status: 500 }
    );
  }
};
