
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from 'next/server';

export const PATCH = async (request) => {
  const db = await connectDB();
  const seekersCollection = db.collection("users");
  const recruitersCollection = db.collection("recruiter");

  try {
    // Get the data to update from the request body
    const { data } = await request.json();

    // Destructure fields from data
    const { email, status } = data;

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // Construct the fields to update
    const fieldsToUpdate = {};
    if (status) fieldsToUpdate.status = status;

    // Update or insert the user in both collections (seekers and recruiters)
    const updateSeekerResult = await seekersCollection.updateOne(
      { email },
      { $set: fieldsToUpdate },
      { upsert: true }
    );
    const updateRecruiterResult = await recruitersCollection.updateOne(
      { email },
      { $set: fieldsToUpdate },
      { upsert: true }
    );

    // Check if any document was updated or inserted
    if (
      (updateSeekerResult.matchedCount === 0 && updateSeekerResult.upsertedCount === 0) &&
      (updateRecruiterResult.matchedCount === 0 && updateRecruiterResult.upsertedCount === 0)
    ) {
      return NextResponse.json({ message: "User not found and not created" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated or created successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update or create user", error: error.message }, { status: 500 });
  }
};
