import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const db = await connectDB();
  const seekersCollection = db.collection("users");
  const recruitersCollection = db.collection("recruiter");

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;
  const role = searchParams.get("role") || "";
  const email = searchParams.get("email") || "";
  const status = searchParams.get("status") || "";

  try {
    const query = {};

    if (status === "blocked") {
      query.status = "blocked";
    } else if (status === "active") {
      query.$or = [{ status: "active" }, { status: { $exists: false } }];
      query.status = { $ne: "blocked" };
    }

    if (role) {
      query.role = role;
    }

    if (email) {
      query.email = { $regex: email, $options: "i" };
    }

    const seekers = await seekersCollection.find(query).toArray();
    const recruiters = await recruitersCollection.find(query).toArray();

    const allUsers = [...seekers, ...recruiters];
    const totalUsers = allUsers.length;
    const paginatedUsers = allUsers.slice(skip, skip + limit);

    return NextResponse.json({
      users: paginatedUsers,
      pagination: {
        currentPage: page,
        totalItems: totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
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
