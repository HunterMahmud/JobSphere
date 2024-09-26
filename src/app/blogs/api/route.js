import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
    const db =await connectDB()
    const blogsCollection = db.collection('blogs');
    console.log(blogsCollection);
    try {
        const blogs = await blogsCollection.find().toArray();
        return NextResponse.json({blogs})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message : "No Data Found", error})
    }
}