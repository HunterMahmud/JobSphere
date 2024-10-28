// api/jobs/applications/route.js

import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export async function GET(request, { query }) {
  const db = await connectDB();
  const applyedJobsCollection = db.collection("applyedJobs");

  const { email, range } = query;
  
  const filter = {
    "applicantInfo.contactInformation.email": email,
  };

  // Date filtering logic based on range (daily, weekly, monthly)
  if (range === "daily") {
    filter.applicationDate = { $gte: new Date(new Date().setDate(new Date().getDate() - 1)) };
  } else if (range === "weekly") {
    filter.applicationDate = { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) };
  } else if (range === "monthly") {
    filter.applicationDate = { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) };
  }

  const applications = await applyedJobsCollection.find(filter).toArray();
  return new Response(JSON.stringify(applications), { status: 200 });
}
