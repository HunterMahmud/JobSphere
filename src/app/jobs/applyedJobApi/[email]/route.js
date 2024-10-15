import { connectDB } from "@/lib/connectDB"

export const GET = async (request, { params }) => {
    const db = await connectDB();
    const applyedJobCollection = db.collection('applyedJobs')

    const url = new URL(request.url);
    const jobTitle = url.searchParams.get("jobTitle");
    const jobType = url.searchParams.get("jobType");
    const sort = url.searchParams.get("sort");
    console.log(jobTitle, jobType, sort)
    console.log(url)
    let query = {
        'applicantInfo.contactInformation.email': params.email
    }

    if (jobTitle) {
        query.jobTitle = { $regex: jobTitle?.toString(), $options: 'i' }
    }

    if (jobType) {
        query.jobType = jobType
    }
    let options = {};
    if (sort) {
        options = {
            sort: { applicationDate: sort === 'asc' ? 1 : -1 }
        }
    }

    try {
        const res = await applyedJobCollection.find(query,options).toArray();
        return Response.json(res);
    } catch (err) {
        console.log(err)
        return Response.json(err);
    }
}