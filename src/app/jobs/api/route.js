import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const db = await connectDB();
  const jobsCollection = db.collection("jobs");

  // Get search query and pagination parameters from the URL
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || ""; // Get the search parameter
  const page = parseInt(searchParams.get("page")) || 1; // Default to page 1 if not provided
  const limit = parseInt(searchParams.get("limit")) || 9; // Default to 9 jobs per page
  const skip = (page - 1) * limit; // Skip jobs for pagination

  try {
    // Perform search with pagination
    const jobs = await jobsCollection
      .find({
        $or: [
          { jobTitle: { $regex: search, $options: "i" } }, // Case-insensitive search for job title
        ],
      })
      .sort({ postedDate: -1 }) // Sort by createdAt field in descending order
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total number of jobs for pagination metadata
    const totalJobs = await jobsCollection.countDocuments({
      $or: [
        { jobTitle: { $regex: search, $options: "i" } }, // Case-insensitive search for job title
      ],
    });

    return NextResponse.json({
      jobs,
      totalJobs,
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found", error });
  }
};
