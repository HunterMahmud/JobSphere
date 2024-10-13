import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server";


export const GET = async (request, {params}) => {
    const db =await connectDB()
    const jobsCollection = db.collection('jobs')
    try {
        const myJobs = await jobsCollection.find({email : params?.email}).toArray();
        // console.log(myJobs)
        return NextResponse.json({myJobs})
    } catch (error) {
        return NextResponse.json({message : "No Data Found"})
    }
}

