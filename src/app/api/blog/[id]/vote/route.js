import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Import ObjectId

// POST request to handle voting logic
export const POST = async (request, { params }) => {
  const { voteType, email } = await request.json(); // Get vote type and user email from request body

  if (!voteType || !email) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  try {
    const db = await connectDB(); // Connect to the database

    // Fetch the blog post by ID
    const blog = await db.collection("blogs").findOne({ _id: new ObjectId(params?.id) });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    // Check if the user has already voted
    const votedUser = blog?.votedUsers?.find((voter) => voter.email === email);

    if (votedUser && votedUser.voteType === voteType) {
      // User has already voted with the same type (prevent duplicate votes)
      return NextResponse.json({ message: "You have already voted this way" }, { status: 400 });
    }

    let updatedBlog = {};

    if (voteType === "upvote") {
      updatedBlog = {
        upvotes: blog.upvotes + 1,
        downvotes: votedUser?.voteType === "downvote" ? blog.downvotes - 1 : blog.downvotes,
        votedUsers: votedUser
          ? blog.votedUsers.map((voter) =>
              voter.email === email ? { ...voter, voteType: "upvote" } : voter
            )
          : [...blog.votedUsers, { email, voteType: "upvote" }],
      };
    } else if (voteType === "downvote") {
      updatedBlog = {
        downvotes: blog.downvotes + 1,
        upvotes: votedUser?.voteType === "upvote" ? blog.upvotes - 1 : blog.upvotes,
        votedUsers: votedUser
          ? blog.votedUsers.map((voter) =>
              voter.email === email ? { ...voter, voteType: "downvote" } : voter
            )
          : [...blog.votedUsers, { email, voteType: "downvote" }],
      };
    }

    // Update the blog with the new vote count and votedUsers
    await db.collection("blogs").updateOne(
      { _id: new ObjectId(params?.id) },
      {
        $set: updatedBlog,
      }
    );

    // Return the updated blog data
    const updatedBlogData = await db.collection("blogs").findOne({ _id: new ObjectId(params.id) });

    return NextResponse.json({ message: "Vote registered successfully", blog: updatedBlogData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 500 });
  }
};
