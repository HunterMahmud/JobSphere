import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Import ObjectId

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const companiesCollection = db.collection("companyInfo");
  try {
    const company = await companiesCollection.findOne({ _id: new ObjectId(params.id) });
    return NextResponse.json({company });
  } catch (error) {
    return NextResponse.json({ message: "No Data Found" });
  }
};
