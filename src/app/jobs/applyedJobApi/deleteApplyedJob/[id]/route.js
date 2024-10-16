import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export const DELETE = async (request, { params }) => {
    const db = await connectDB();
    const applyedJobCollection = db.collection('applyedJobs');

    try {
        const res = await applyedJobCollection.deleteOne({
            _id: new ObjectId(params.id),
        });

        return Response.json(res);
    } catch (err) {
        return Response.json(err.message);
    }
};

export const PUT = async (request, { params }) => {
    const db = await connectDB();
    const applyedJobCollection = db.collection('applyedJobs');
    const query = { _id: new ObjectId(params.id) }
    const updateDoc = await request.json();
    try {
        const res = await applyedJobCollection.updateOne(
            query,
            {
                $set: {
                    ...updateDoc
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