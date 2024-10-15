import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const db = await connectDB();
  const blogsCollection = db.collection("blogs");
  
  // Get search query and pagination parameters from the URL
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || ""; // Get the search parameter
  const page = parseInt(searchParams.get("page")) || 1; // Default to page 1 if not provided
  const limit = parseInt(searchParams.get("limit")) || 9; // Default to 9 blogs per page
  const skip = (page - 1) * limit; // Skip blogs for pagination

  try {
    // Perform search with pagination
    const blogs = await blogsCollection
      .find({
        $or: [
          { title: { $regex: search, $options: "i" } }, // Case-insensitive search for job title
        ],
      })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total number of blogs for pagination metadata
    const totalBlogs = await blogsCollection.countDocuments({
      $or: [
        { title: { $regex: search, $options: "i" } }, // Case-insensitive search for job title
      ],
    });

    return NextResponse.json({
      blogs,
      totalBlogs,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / limit),
    });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ message: "No Data Found", error });
  }
};
