
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from 'next/server';

export const PATCH = async (request) => {
  const db = await connectDB();
  const jobsCollection = db.collection("jobs");
 

  try {
    // Get the data to update from the request body
    const { data } = await request.json();

    // Destructure fields from data
    const { id, status } = data;

    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    // Construct the fields to update
    const fieldsToUpdate = {};
    if (status) fieldsToUpdate.status = status;

    // Update or insert the user in both collections (jobs and recruiters)
    const upgradeStatus = await jobsCollection.updateOne(
      { _id : new ObjectId(id) },
      { $set: fieldsToUpdate },
      { upsert: true }
    );

    // Check if any document was updated or inserted
    if(upgradeStatus.matchedCount === 0 && upgradeStatus.upsertedCount === 0)

     {
      return NextResponse.json({ message: "User not found and not created" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated or created successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update or create user", error: error.message }, { status: 500 });
  }
};
