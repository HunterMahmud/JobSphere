import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
    const db = await connectDB();
    const jobsCollection = db.collection("jobs");
    console.log(jobsCollection);
    try {
        const companiesName = await jobsCollection
            .find({}, { projection: { "companyDetails.companyName": 1 } })
            .toArray()

        return NextResponse.json({ companiesName });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "No Data Found", error });
    }
};