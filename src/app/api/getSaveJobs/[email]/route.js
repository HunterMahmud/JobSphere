import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const SaveJobsCollection = db.collection("saveJobs");

  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const jobType = url.searchParams.get("jobType");
  const search = url.searchParams.get("search");
  const page = parseInt(url.searchParams.get("page")) || 1;
  const limit = parseInt(url.searchParams.get("limit")) || 10;
  const today = new Date().toISOString();

  let filter = { 'user.email': params?.email };

  // Add status filter if provided
 
  if (status ==='Live') {
   filter['job.deadline'] = { $gt: today };  // Jobs where deadline is in the future
  }
  else if (status ==='Closed') {
   filter['job.deadline'] = { $lt: today };  // Jobs where deadline is in the past
  }
  // Add job type filter if provided
  if (jobType) {
    filter['job.jobType'] = jobType;
  }

  // Add search filter for job title if provided
  if (search) {
    filter['job.jobTitle'] = { $regex: search, $options: "i" }; // case-insensitive search
  }

  const skip = (page - 1) * limit;

  try {
    const jobs = await SaveJobsCollection
      .find(filter)
      .skip(skip) // Pagination
      .limit(limit) // Limit the results
      .toArray();

    const total = await SaveJobsCollection.countDocuments(filter); // Count total jobs matching the filter

    return NextResponse.json({ jobs, total, page, limit ,status, filter });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found", error });
  }
};
