import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const db = await connectDB();
    const applyedJobsCollection = db.collection("applyedJobs");

    // Validate and parse the request URL
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email") || "";
    const range = searchParams.get("range") || "";

    // Set up the filter
    const filter = { "applicantInfo.contactInformation.email": email };

    // Query the database with email filter only
    const applications = await applyedJobsCollection.find(filter).toArray();

    // Determine date range for filtering
    let dateRange;
    if (range === "daily") {
      dateRange = new Date(new Date().setDate(new Date().getDate() - 1));
    } else if (range === "weekly") {
      dateRange = new Date(new Date().setDate(new Date().getDate() - 7));
    } else if (range === "monthly") {
      dateRange = new Date(new Date().setMonth(new Date().getMonth() - 1));
    }

    // Apply date filtering in JavaScript
    const filteredApplications = applications.filter((app) => {
      // Parse applicationDate as a Date object
      const applicationDate = new Date(app.applicationDate);
      return !isNaN(applicationDate) && applicationDate >= dateRange;
    });

    // Return the response
    return NextResponse.json({ applications: filteredApplications }, { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
