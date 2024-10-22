import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request, {params}) => {
    const db = await connectDB();
    const reviewData = await request.json();
    // console.log(reviewData);
    const reviewsCollection = db.collection("reviews");
    
    try {
        const reviews = await reviewsCollection.insertOne(reviewData);
        return NextResponse.json({ message: "Reviews added successfully" }, {status: 200});
    } catch (error) {
        return NextResponse.json({ message: "Error happened", error });
    }
};
