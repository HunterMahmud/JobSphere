import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const db = await connectDB();
  const blogsCollection = db.collection("blogs");

  // Extract query parameters for pagination
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 6; // Default limit is 5

  const skip = (page - 1) * limit; // Calculate how many documents to skip

  try {
    const blogs = await blogsCollection
      .find()
      .sort({ creationTime: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalBlogs = await blogsCollection.countDocuments();
    const totalPages = Math.ceil(totalBlogs / limit);

    return NextResponse.json({
      blogs,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found", error }, { status: 500 });
  }
};