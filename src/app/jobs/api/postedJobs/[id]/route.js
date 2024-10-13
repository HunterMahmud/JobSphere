import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';

export const GET = async (request, {params}) => {
  const db = await connectDB();
  const jobsCollection = db.collection("jobs");

  try {
    const jobs = await jobsCollection
      .find({'compnayInforamtion._id': new ObjectId(params.id)})
      .sort({ creationTime: -1 })
      .toArray();

    return NextResponse.json({ jobs });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No comapny found", error });
  }
};
