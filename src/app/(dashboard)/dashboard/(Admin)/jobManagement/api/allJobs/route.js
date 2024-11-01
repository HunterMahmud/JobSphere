import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

// Fetch jobs from the database with sorting, filtering, and searching functionality
export const GET = async (request) => {
  const db = await connectDB();
  const jobsCollection = db.collection("jobs");

  // Get query parameters from the request URL
  const { searchParams } = new URL(request.url);
  const jobType = searchParams.get("jobType") || "";
  const status = searchParams.get("status") || "";
  const sort = searchParams.get("sort") || "asc"; // Default to ascending
  const jobTitle = searchParams.get("jobTitle") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;

  const skip = (page - 1) * limit;

  try {
    // Create a query for filtering by jobType and jobTitle (if provided)
    const query = {};
    if (status === "blocked") {
      query.status = "blocked";
    } else if (status === "active") {
      query.$or = [{ status: "active" }, { status: { $exists: false } }];
      query.status = { $ne: "blocked" };
    }
    if (jobType) {
      query.jobType = jobType;
    }
    if (jobTitle) {
      query.jobTitle = { $regex: jobTitle, $options: "i" }; // Case-insensitive search
    }

    // Apply sorting by deadline
    const sortOptions = sort === "asc" ? { deadline: 1 } : { deadline: -1 };

    // Fetch jobs with pagination, filtering, sorting, and searching
    const allJobs = await jobsCollection
      .find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total count of jobs matching the query (without pagination)
    const totalJobs = await jobsCollection.countDocuments(query);

    // Return jobs data and total count
    return NextResponse.json({
      jobs: allJobs,
      total: totalJobs,
      page,
      limit,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ message: "Error fetching job listings", error });
  }
};



export const dynamic = 'force-dynamic';