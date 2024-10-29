import { connectDB } from "@/lib/connectDB"

export const GET = async (request, { params }) => {
    const db = await connectDB();
    const applyedJobCollection = db.collection('applyedJobs')

    const url = new URL(request.url);
    const jobTitle = url.searchParams.get("jobTitle");
    const jobType = url.searchParams.get("jobType");
    const jobStatus = url.searchParams.get("jobStatus");
    const sort = url.searchParams.get("sort");
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    let query = {
        'applicantInfo.contactInformation.email': params.email
    }

    if (jobTitle) {
        query.jobTitle = { $regex: jobTitle?.toString(), $options: 'i' }
    }

    if (jobType) {
        query.jobType = jobType
    }
    if (jobStatus) {
        query.jobStatus = jobStatus
    }

    let options = {};
    if (sort) {
        options = {
            sort: { applicationDate: sort === 'asc' ? 1 : -1 }
        }
    }

    try {
        const jobs = await applyedJobCollection.find(query, options).skip(skip).limit(limit).toArray();
        const total = await applyedJobCollection.countDocuments(query, options); // Count total jobs matching the filter
        return Response.json({ jobs, total });
    } catch (err) {
        console.log(err)
        return Response.json(err);
    }
}


export const dynamic = 'force-dynamic';