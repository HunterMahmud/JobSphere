import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await connectDB();
  const companyCollection = db.collection("companyInfo");

  try {
    const company = await companyCollection
      .find()
      .sort({ creationTime: -1 })
      .toArray();

    return NextResponse.json({ company });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No comapny found", error });
  }
};
