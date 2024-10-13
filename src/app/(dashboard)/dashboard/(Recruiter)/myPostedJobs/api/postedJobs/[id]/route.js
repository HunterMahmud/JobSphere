import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const jobsCollection = db.collection("jobs");
  try {
    const resp = await jobsCollection.deleteOne({
      _id: new ObjectId(params.id),
    });

    return NextResponse.json({ message: "Job deleted", response: resp });
  } catch (error) {
    return NextResponse.json({ message: "Something Went Wrong" });
  }
};


export const PUT = async (request, { params }) => {
  const db = await connectDB();
  const jobsCollection = db.collection("jobs");
  const updateDoc = await request.json();
  console.log(updateDoc)
  try {
    const resp = await jobsCollection.updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          ...updateDoc
        },
      },
      {
        upsert : true
      }
    );
    console.log(resp)
    return NextResponse.json({ message: "updated the job", response: resp });
  } catch (error) {
    return NextResponse.json({ message: "Something Went Wrong" });
  }
};



export const GET = async (request, { params }) => {
  const db = await connectDB();
  const jobsCollection = db.collection("jobs");
  try {
    const resp = await jobsCollection.findOne({
      _id: new ObjectId(params.id),
    });
    return NextResponse.json({ message: "job found", data: resp });
  } catch (error) {
    return NextResponse.json({ message: "Something Went Wrong" });
  }
};



