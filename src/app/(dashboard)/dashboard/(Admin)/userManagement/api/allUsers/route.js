import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const db = await connectDB();
  const seekersCollection = db.collection("users");
  const recruitersCollection = db.collection("recruiter");

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const role = searchParams.get("role") || "";
  const email = searchParams.get("email");
  const status = searchParams.get("status") || "";

  try {
    const query = {};

    if (status === "blocked") {
      query.status = "blocked";
    } 
    if (status === "active") {
      query.$or = [{ status: "active" }, { status: { $exists: false } }];
      query.status = { $ne: "blocked" };
    }

    if (role) {
      query.role = role;
    }

    if (email) {
      query.email = { $regex: email, $options: "i" };
    }

    // Divide limit for balanced results from each collection
    const seekersLimit = Math.ceil(limit / 2);
    const recruitersLimit = Math.floor(limit / 2);

    // Calculate the number of documents to skip for each collection based on page
    const seekersSkip = (page - 1) * seekersLimit;
    const recruitersSkip = (page - 1) * recruitersLimit;

    // Fetch and count seekers with adjusted pagination
    const seekersPromise = seekersCollection
      .find(query)
      .skip(seekersSkip)
      .limit(seekersLimit)
      .toArray();
    const seekersCountPromise = seekersCollection.countDocuments(query);

    // Fetch and count recruiters with adjusted pagination
    const recruitersPromise = recruitersCollection
      .find(query)
      .skip(recruitersSkip)
      .limit(recruitersLimit)
      .toArray();
    const recruitersCountPromise = recruitersCollection.countDocuments(query);

    const [seekers, seekersCount, recruiters, recruitersCount] = await Promise.all([
      seekersPromise,
      seekersCountPromise,
      recruitersPromise,
      recruitersCountPromise,
    ]);

    const allUsers = [...seekers, ...recruiters];
    const totalUsers = seekersCount + recruitersCount;
    const totalPages = Math.ceil(totalUsers / limit);

    return NextResponse.json({
      users: allUsers,
      pagination: {
        currentPage: page,
        totalItems: totalUsers,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Error fetching data.", error: error.message },
      { status: 500 }
    );
  }
};
