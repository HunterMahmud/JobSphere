import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const db = await connectDB();
  const companiesCollection = db.collection("companyInfo");

  const url = new URL(request.url);
  
  // Retrieve search, page, and limit from query parameters
  const search = url.searchParams.get("search") || "";
  const page = parseInt(url.searchParams.get("page")) || 1;
  const limit = parseInt(url.searchParams.get("limit")) || 6;

  // Create a filter object
  const filter = search
    ? { 'companyInfo.companyName': { $regex: search, $options: "i" } } // Search case-insensitive by job title
    : {};

  // Pagination logic
  const skip = (page - 1) * limit;

  try {
    // Fetch companies based on filter, pagination, and sort
    const companies = await companiesCollection
      .find(filter)
      .skip(skip) // Skip documents for pagination
      .limit(limit) // Limit number of results
      .sort({ creationTime: -1 }) // Sort by creationTime (newest first)
      .toArray();

    // Count total companies matching the filter
    const total = await companiesCollection.countDocuments(filter);

    // Return the companies, total count, current page, and limit
    return NextResponse.json({ company: companies, total, page, limit });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "No Data Found", error });
  }
};



export const dynamic = 'force-dynamic';