import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export const PUT = async (request, { params }) => {
    const db = await connectDB();
    const jobsCollection = db.collection("jobs");
    const query = { _id: new ObjectId(params.id) }
    const job = await jobsCollection.findOne(query);
    const applicantsNumber = job?.applicantsNumber - 1;

    try {
        const res = await jobsCollection.updateOne(
            query,
            {
                $set: {
                    applicantsNumber
                }
            },
            {
                upsert: true
            }
        )
        return Response.json(res)
    } catch (err) {
        return Response.json(err.message)
    }
}