import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server";


export const GET = async (request, {params}) => {
    const url = new URL(request.url);
    const jobTitle = url.searchParams.get("jobTitle");
    const jobType = url.searchParams.get("jobType");
    const jobStatus = url.searchParams.get("jobStatus");
    const sort = url.searchParams.get("sort");
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;
    const today = new Date();

    let query = {email : params?.email}

    if (jobTitle) {
        query.jobTitle = { $regex: jobTitle?.toString(), $options: 'i' }
    }

    if (jobType) {
        query.jobType = jobType
    }
    // Convert string-based deadline field to a Date object for comparison
if (jobStatus === "Live") {
    query.$expr = {
      $gt: [
        { $dateFromString: { dateString: "$deadline" } }, // Convert deadline from string to Date
        new Date() // Compare with today's date
      ]
    };
  } else if (jobStatus === "Closed") {
    query.$expr = {
      $lte: [
        { $dateFromString: { dateString: "$deadline" } }, // Convert deadline from string to Date
        new Date() // Compare with today's date
      ]
    };
  }
    console.log(query)
    let options = {};
    if (sort) {
        options = {
            sort: { applicantsNumber: sort === 'asc' ? 1 : -1 }
        }
    }
    const db =await connectDB()
    const jobsCollection = db.collection('jobs')
    try {
        const myJobs = await jobsCollection.find(query, options).skip(skip).limit(limit).toArray();
        // console.log(myJobs)
        const total = await jobsCollection.countDocuments(query, options); // Count total jobs matching the filter
        return NextResponse.json({myJobs, total})
    } catch (error) {
        return NextResponse.json({message : "No Data Found"})
    }
}

