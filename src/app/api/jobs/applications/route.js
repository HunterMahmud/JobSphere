import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params })=> {
  try {
    const db = await connectDB();
    const applyedJobsCollection = db.collection("applyedJobs");

    // Validate and parse the request URL
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email") || "";
    const range = searchParams.get("range") || "";

    // Set up the filter
    const filter = { "applicantInfo.contactInformation.email": email };

    // Date filtering logic based on range (daily, weekly, monthly)
    if (range === "daily") {
      filter.applicationDate = {
        $gte: new Date(new Date().setDate(new Date().getDate() - 1))
      };
    } else if (range === "weekly") {
      filter.applicationDate = {
        $gte: new Date(new Date().setDate(new Date().getDate() - 7))
      };
    } else if (range === "monthly") {
      filter.applicationDate = {
        $gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
      };
    }
    
    console.log("Filter applied:", filter);

    // Query the database
    const applications = await applyedJobsCollection.find(filter).toArray();
    // console.log(applications)
    // Return the response
    return NextResponse.json({ applications }, { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json({ message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
