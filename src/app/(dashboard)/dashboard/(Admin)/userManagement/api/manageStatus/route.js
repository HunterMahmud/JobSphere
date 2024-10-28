import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const PATCH = async (request) => {
  const db = await connectDB();
  const seekersCollection = db.collection("users");
  const recruitersCollection = db.collection("recruiter");

  try {
    // Get the data to update from the request body
    const { data } = await request.json();
    const { email, status, userRole } = data;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 }
      );
    }
    if (!userRole) {
      return NextResponse.json(
        { message: "User role (seeker or recruiter) is required." },
        { status: 400 }
      );
    }

    // Construct the fields to update
    const fieldsToUpdate = {};
    if (status) fieldsToUpdate.status = status;

    // Update or insert the user in the specified collection
    let updateResult;
    if (userRole === "seeker") {
      updateResult = await seekersCollection.updateOne(
        { email },
        { $set: fieldsToUpdate },
        { upsert: true }
      );
    } else if (userRole === "recruiter") {
      updateResult = await recruitersCollection.updateOne(
        { email },
        { $set: fieldsToUpdate },
        { upsert: true }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid user role. Must be 'seeker' or 'recruiter'." },
        { status: 400 }
      );
    }

    if (updateResult.matchedCount > 0) {
      return NextResponse.json(
        { message: "User updated successfully." },
        { status: 200 }
      );
    } else if (updateResult.upsertedCount > 0) {
      return NextResponse.json(
        { message: "User created successfully." },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "No changes made to the user." },
        { status: 204 }
      );
    }
  } catch (error) {
    console.error("Error updating or creating user:", error);
    return NextResponse.json(
      { message: "Failed to update or create user.", error: error.message },
      { status: 500 }
    );
  }
};
