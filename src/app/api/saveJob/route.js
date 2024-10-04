import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const db = await connectDB();
  const SaveJobsCollection = db.collection("saveJobs");

  try {
    const data = await req.json(); // Get the data from the request body
   
   
    const id = data?.job?._id
    // Check if a job with the same title already exists
    const existingJob = await SaveJobsCollection.findOne({"job._id":id });
    

    if (existingJob) {
      return NextResponse.json({ message: "This Job already added" }, { status: 409 }); // 409 Conflict status code
    }

    // If no job exists, insert the new job into the collection
    const result = await SaveJobsCollection.insertOne(data);

    return NextResponse.json({ message: "Job Added Successfully"});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to Add Job", error }, { status: 500 });
  }
};
