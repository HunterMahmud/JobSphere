import { connectDB } from "@/lib/connectDB"

export const GET = async (request, { params }) => {
    const db = await connectDB();
    const applyedJobCollection = db.collection('applyedJobs')

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    let query = {
        'jobId': params.id
    }

    try {
        const jobs = await applyedJobCollection.find(query).skip(skip).limit(limit).toArray();
        const total = await applyedJobCollection.countDocuments(query); // Count total jobs matching the filter
        return Response.json({ jobs, total });
    } catch (err) {
        console.log(err)
        return Response.json(err);
    }
}