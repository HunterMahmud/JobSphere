import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const usersCollection = db.collection("users");
  const recruiterCollection = db.collection("recruiter");

  try {
    // Search in 'users' collection
    let user = await usersCollection.findOne({ email: params.email });

    // If not found in 'users', search in 'recruiter' collection
    if (!user) {
      user = await recruiterCollection.findOne({ email: params.email });
    }

    // If still no user found, return 404
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return user data, including role
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { message: "Error fetching user data" },
      { status: 500 }
    );
  }
};
