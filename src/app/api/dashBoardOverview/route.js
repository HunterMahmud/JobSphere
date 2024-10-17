import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await connectDB();
  const jobsCollection = db.collection("jobs");
  const usersCollection = db.collection("users");
  const companyCollection = db.collection("companyInfo");


  try {
    // Get total number of jobs for pagination metadata
    const totalJobs = await jobsCollection.countDocuments();
    const totalUsers = await usersCollection.countDocuments();
    const totalCompanies = await companyCollection.countDocuments();

    return NextResponse.json({ totalJobs ,totalUsers, totalCompanies});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found", error });
  }
};
