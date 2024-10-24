import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
    const db = await connectDB();
    const reviewsCollection = db.collection("reviews");

    try {
     
        const reviews = await reviewsCollection
            .find()
            .sort({ reviewDateTime: -1 }) 
            .limit(10)
            .toArray();

        return NextResponse.json({ reviews });
    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error });
    }
};
