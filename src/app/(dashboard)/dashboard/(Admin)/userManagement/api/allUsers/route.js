import { connectDB } from "@/lib/connectDB";
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
  const role = searchParams.get("role") || ""; // Default is empty, will return all users
  const email = searchParams.get("email") || "";

  try {
    // Create a query for filtering by role and email (if provided)
    const query = {};
    if (role) {
      query.role = role;
    }
    if (email) {
      query.email = { $regex: email, $options: "i" }; // Case-insensitive search
    }

    // Fetch data from both 'users' and 'recruiter' collections
    const seekersPromise = seekersCollection.find(query).toArray();
    const recruitersPromise = recruitersCollection.find(query).toArray();

    // Await both promises
    const [seekers, recruiters] = await Promise.all([seekersPromise, recruitersPromise]);

    // Merge the data from both collections
    const allUsers = [...seekers, ...recruiters];

    // Calculate total users
    const totalUsers = allUsers.length;

    // Apply pagination logic after combining the data
    const paginatedUsers = allUsers.slice(skip, skip + limit);

    // Return the combined data along with pagination info
    return NextResponse.json({
      users: paginatedUsers,
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
    }, { status: 500 });
  }
};
