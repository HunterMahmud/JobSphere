import { connectDB } from "@/lib/connectDB"

export const GET = async (request, { params }) => {
    const db = await connectDB();
    const userInfoCollection = db.collection('usersInformation');
    try {
        const res = await userInfoCollection.findOne({ 'personalInformation.email': params.email });
        return Response.json(res);
    } catch (err) {
        console.log(err)
        return Response.json(err);
    }
}

export const PUT = async (request, { params }) => {
    const db = await connectDB();
    const userInfoCollection = db.collection('usersInformation');
    const updateDoc = await request.json();
    console.log(updateDoc)
    try {
        const res = await userInfoCollection.updateOne(
            { 'personalInformation.email': params.email },
            {
                $set: {
                    ...updateDoc
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