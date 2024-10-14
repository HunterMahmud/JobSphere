import { connectDB } from "@/lib/connectDB";

export const POST = async (request) => {
    const applyedJob = await request.json();
    console.log(applyedJob)
    const db = await connectDB();
    const applyedJobCollection = db.collection('applyedJobs')
    const query = {
        jobId: applyedJob.jobId,
        'applicantInfo.contactInformation.email': applyedJob.applicantInfo.contactInformation.email
    };
    const alreadyApplied = await applyedJobCollection.findOne(query);
    if (alreadyApplied) {
        return Response.json({ status: (400) }, { message: 'You have already applied on this job' })
    }
    try {
        const res = await applyedJobCollection.insertOne(applyedJob);
        return Response.json(res)
    } catch (err) {
        console.log(err.message)
    }
}