import { connectDB } from "@/lib/connectDB"

export const GET = async (request, { params }) => {
    const db = await connectDB();
    const applyedJobCollection = db.collection('applyedJobs')
    try {
        const res = await applyedJobCollection.find({ 'applicantInfo.contactInformation.email': params.email }).toArray();
        return Response.json(res);
    } catch (err) {
        console.log(err)
        return Response.json(err);
    }
}