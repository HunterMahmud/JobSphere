import { connectDB } from "@/lib/connectDB"; // Ensure the correct path for your database connection
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const db = await connectDB();
  const seekersCollection = db.collection("users");
  const recruitersCollection = db.collection("recruiter");

  // Get query parameters for pagination
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1; // Default to page 1
  const limit = parseInt(searchParams.get("limit")) || 10; // Default to 10 items per page
  const skip = (page - 1) * limit; // Calculate number of items to skip

  try {
    // Fetch data from both 'users' and 'recruiter' collections
    const seekersPromise = seekersCollection.find({}).skip(skip).limit(limit).toArray();
    const recruitersPromise = recruitersCollection.find({}).skip(skip).limit(limit).toArray();

    // Await both promises
    const [seekers, recruiters] = await Promise.all([seekersPromise, recruitersPromise]);

    // Count total seekers and recruiters for pagination
    const totalSeekers = await seekersCollection.countDocuments({});
    const totalRecruiters = await recruitersCollection.countDocuments({});
    const totalUsers = totalSeekers + totalRecruiters;

    // Merge the data from both collections
    const allUsers = [...seekers, ...recruiters];
console.log(allUsers)
    // Return the combined data along with pagination info
    return NextResponse.json({
      users: allUsers,
      pagination: {
        currentPage: page,
        totalItems: totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error); // Log the error for debugging
    return NextResponse.json({
      message: "Error fetching data.",
      error: error.message,
    }, { status: 500 }); // Send error response with a 500 status code
  }
};
