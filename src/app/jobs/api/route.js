import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const db = await connectDB();
  const jobsCollection = db.collection("jobs");

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const city = searchParams.get("city") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 6;
  const skip = (page - 1) * limit;

  try {
    const query = {};
    
    // Add job title filter if provided
    if (search) {
      query.jobTitle = { $regex: search, $options: "i" }; // Case-insensitive search
    }
    
    // Add city filter if provided
    if (city) {
      query["compnayInforamtion.companyInfo.city"] = { $regex: city, $options: "i" };
    }

    query.$expr = {
      $gte: [
        { $dateFromString: { dateString: "$deadline" } }, // Convert deadline from string to Date
        new Date() // Compare with today's date
      ]
    };

    const totalJobsCount = await jobsCollection.countDocuments(query);

    // Fetch jobs with pagination
    const jobs = await jobsCollection
      .find(query)
      .sort({ postedDate: -1 }) // Sort by posted date
      .skip(skip) // Pagination
      .limit(limit) // Pagination
      .toArray();

    console.log(jobs.length, totalJobsCount)

    const distinctCities = await jobsCollection.aggregate([
      { $match: { "compnayInforamtion.companyInfo.city": { $exists: true, $ne: "" } } },
      { $group: { _id: "$compnayInforamtion.companyInfo.city" } },
      { $project: { _id: 0, city: "$_id" } },
    ]).toArray();

    return NextResponse.json({
      jobs: jobs,
      currentPage: page,
      totalPages: Math.ceil(totalJobsCount / limit), // Total pages based on unfiltered count
      cities: distinctCities,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found", error });
  }
};






