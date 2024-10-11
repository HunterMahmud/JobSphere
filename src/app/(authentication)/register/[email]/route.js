import { connectDB } from "@/lib/connectDB";

export const PUT = async (request, { params }) => {
    const db = await connectDB();
    const userCollection = db.collection("users");
    const updateDoc = await request.json();
    console.log(updateDoc)
    try {
        const res = await userCollection.updateOne(
            { 'email': params.email },
            {
                $set: {
                    userIMG: updateDoc?.userIMG
                },
            },
            {
                upsert: true
            }
        );
        return Response.json(res);
    } catch (err) {
        return Response.json({ message: "Something Went Wrong" });
    }
};