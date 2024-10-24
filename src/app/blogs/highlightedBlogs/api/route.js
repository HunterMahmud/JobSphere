import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const db = await connectDB();
  const blogsCollection = db.collection("blogs");

  try {
    // Fetch up to 6 blogs sorted by upvotes
    const upvotedBlogs = await blogsCollection
      .find({})
      .sort({ upvotes: -1 }) // Sort by upvotes in descending order
      .limit(6)
      .toArray();

    let totalBlogs = upvotedBlogs.length;

    // If we have less than 6 blogs, fetch additional blogs sorted by most recent
    if (totalBlogs < 6) {
      const additionalBlogs = await blogsCollection
        .find({
          _id: { $nin: upvotedBlogs.map((blog) => blog._id) }, // Exclude the already fetched upvoted blogs
        })
        .sort({ publishedDate: -1 }) // Sort by recent blogs
        .limit(6 - totalBlogs) // Fetch the remaining needed blogs to make 6 total
        .toArray();

      // Combine upvoted blogs with recent blogs
      upvotedBlogs.push(...additionalBlogs);
      totalBlogs = upvotedBlogs.length;
    }

    return NextResponse.json({
      blogs: upvotedBlogs,
      totalBlogs,
    });
  } catch (error) {
    return NextResponse.json({ message: "No Data Found", error });
  }
};
