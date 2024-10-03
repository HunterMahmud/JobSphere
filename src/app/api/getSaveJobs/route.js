import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await connectDB();
  const SaveJobsCollection = db.collection("saveJobs");
  console.log(SaveJobsCollection);
  try {
    const jobs = await SaveJobsCollection
      .find()
      .toArray()

    return NextResponse.json({ jobs });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found", error });
  }
};