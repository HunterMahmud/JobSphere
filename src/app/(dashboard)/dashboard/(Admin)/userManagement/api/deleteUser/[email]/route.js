import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const seekersCollection = db.collection("users");
  const recruitersCollection = db.collection("recruiter");

  const { email } = params; // Extract email from URL params

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    // Try deleting the user from both collections (seekers and recruiters)
    const deleteSeekerResult = await seekersCollection.deleteOne({ email });
    const deleteRecruiterResult = await recruitersCollection.deleteOne({ email });

    // Check if any document was deleted
    if (deleteSeekerResult.deletedCount === 0 && deleteRecruiterResult.deletedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete user", error }, { status: 500 });
  }
};
