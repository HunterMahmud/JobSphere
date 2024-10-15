import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const db = await connectDB();
  const seekersCollection = db.collection("users");
  const recruitersCollection = db.collection("recruiter");

  try {
    // Fetch data from both 'users' and 'recruiter' collections
    const seekers = await seekersCollection.find({}).toArray();
    const recruiters = await recruitersCollection.find({}).toArray();

    // Merge the data from both collections
    const allUsers = [...seekers, ...recruiters];

    // Return the combined data
    return NextResponse.json({ users: allUsers });
  } catch (error) {
    return NextResponse.json({ message: "No Data Found", error });
  }
};
