import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Import ObjectId

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const jobsCollection = db.collection("jobs");
  try {
    const job = await jobsCollection.findOne({ _id: new ObjectId(params.id) });
    return NextResponse.json({ job });
  } catch (error) {
    return NextResponse.json({ message: "No Data Found" });
  }
};
