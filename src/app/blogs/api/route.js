import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await connectDB();
  const blogsCollection = db.collection("blogs");
  console.log(blogsCollection);
  try {
    const blogs = await blogsCollection
      .find()
      .sort({ creationTime: -1 })
      .toArray();

    return NextResponse.json({ blogs });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found", error });
  }
};





// import { connectDB } from "@/lib/connectDB";
// import { NextResponse } from "next/server";

// // GET handler with pagination
// export const GET = async (request) => {
//   const db = await connectDB();
//   const blogsCollection = db.collection("blogs");

//   // Extract query parameters (page and limit) from the request URL
//   const { searchParams } = new URL(request.url);
//   const page = parseInt(searchParams.get("page")) || 1; // Default to page 1 if not provided
//   const limit = parseInt(searchParams.get("limit")) || 10; // Default to 10 items per page if not provided

//   const skip = (page - 1) * limit; // Calculate the number of documents to skip

//   try {
//     // Get total number of documents for pagination metadata
//     const totalBlogs = await blogsCollection.countDocuments();

//     // Fetch blogs with sorting and pagination
//     const blogs = await blogsCollection
//       .find()
//       .sort({ creationTime: -1 }) // Sort by creation time in descending order
//       .skip(skip) // Skip to the appropriate page
//       .limit(limit) // Limit the number of results to `limit`
//       .toArray();

//     // Return the blogs and pagination metadata
//     if (blogs.length === 0) {
//       return NextResponse.json({
//         message: "No blogs available for the specified page.",
//         blogs,
//         totalPages: Math.ceil(totalBlogs / limit),
//         currentPage: page,
//         totalBlogs,
//       });
//     }

//     return NextResponse.json({
//       blogs,
//       totalPages: Math.ceil(totalBlogs / limit), // Calculate total pages
//       currentPage: page,
//       totalBlogs,
//     });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ message: "No Data Found", error });
//   }
// };
