import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server";


export const GET = async (request, {params}) => {
    const db =await connectDB()
    const addedJobsCollection = db.collection('addedJobs')
    try {
        const myAddedJobs = await addedJobsCollection.find({email : params.email}).toArray();
        console.log(myAddedJobs)
        return NextResponse.json({myAddedJobs})
    } catch (error) {
        return NextResponse.json({message : "No Data Found"})
    }
}

