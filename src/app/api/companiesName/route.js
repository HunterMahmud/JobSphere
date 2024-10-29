import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
    const db = await connectDB();
    const companiesCollection = db.collection("companyInfo");
    try {
        const companiesName = await companiesCollection
            .find({}, { projection: { "companyInfo.companyName": 1 ,"companyInfo.logo": 1 } })
            .toArray()

        return NextResponse.json({ companiesName });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "No Data Found", error });
    }
};


export const dynamic = 'force-dynamic';