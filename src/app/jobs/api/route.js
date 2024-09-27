import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await connectDB();
  const jobsCollection = db.collection("jobs");
  console.log(jobsCollection);
  try {
    const jobs = await jobsCollection
      .find()
      .toArray()

    return NextResponse.json({ jobs });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found", error });
  }
};