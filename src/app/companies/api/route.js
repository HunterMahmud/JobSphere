import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await connectDB();
  const companyCollection = db.collection("company");
  console.log(companyCollection);
  try {
    const company = await companyCollection
      .find()
      .sort({ creationTime: -1 })
      .toArray();

    return NextResponse.json({ company });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found", error });
  }
};
