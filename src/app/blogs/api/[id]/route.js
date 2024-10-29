import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Import ObjectId

export const GET = async (request, {params}) => {
    const db =await connectDB()
    const blogsCollection = db.collection('blogs')
    try {
        const blog = await blogsCollection.findOne({ _id: new ObjectId(params.id) });
        return NextResponse.json({blog})
    } catch (error) {
        return NextResponse.json({message : "No Data Found"})
    }
}


export const dynamic = 'force-dynamic';