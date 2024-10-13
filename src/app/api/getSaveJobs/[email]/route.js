import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const SaveJobsCollection = db.collection("saveJobs");
  // console.log(params.email)
  try {
    const jobs = await SaveJobsCollection
      .find({'user.email': params?.email})
      .toArray()

    return NextResponse.json({ jobs });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found", error });
  }
};