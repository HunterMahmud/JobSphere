import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export const DELETE = async (request, { params }) => {
    const db = await connectDB();
    const applyedJobCollection = db.collection('applyedJobs')
    try {
        const res = await applyedJobCollection.deleteOne({
            _id: new ObjectId(params.id),
        });

        return Response.json(res);
    } catch (err) {
        return Response.json(err.message);
    }
};