import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const db = await connectDB();
  const jobsCollection = db.collection("jobs");

  // Get search query from the URL
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || ''; // Get the search parameter, default to an empty string if not provided

  try {
    // Perform search based on the `search` query parameter
    const jobs = await jobsCollection
      .find({
        $or: [
          { 'jobTitle': { $regex: search, $options: 'i' } }, // Case-insensitive search for job title
        ]
      })
      .toArray();

    return NextResponse.json({ jobs });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found", error });
  }
};
