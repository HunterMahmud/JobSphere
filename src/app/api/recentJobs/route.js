import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
    const db = await connectDB();
    const jobsCollection = db.collection("jobs");
    
    try {
        const recentJobs = await jobsCollection
            .find()
            .sort({'postedDate': -1 }) // Sort by postedDate in descending order (newest first)
            .limit(6)                  // Limit the result to 6 documents
            .toArray();

        return NextResponse.json({ recentJobs });
    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error });
    }
};
