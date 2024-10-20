import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const SaveJobsCollection = db.collection("saveJobs");
  const { id } = params; // Get id from params

  // Check if id is valid
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid Job ID" }, { status: 400 });
  }

  try {
    const result = await SaveJobsCollection.deleteOne({ _id: new ObjectId(id) });
    return Response.json(result)
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
};
