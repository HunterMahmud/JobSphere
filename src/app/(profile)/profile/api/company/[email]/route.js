import { connectDB } from "@/lib/connectDB"

export const GET = async (request, { params }) => {
    const db = await connectDB();
    const companyInfoCollection = db.collection('companyInfo');
    try {
        const res = await companyInfoCollection.findOne({ 'contactInformation.email': params.email });
        return Response.json(res);
    } catch (err) {
        console.log(err)
        return Response.json(err);
    }
}

export const PUT = async (request, { params }) => {
    const db = await connectDB();
    const companyInfoCollection = db.collection('companyInfo');
    const updateDoc = await request.json();
    console.log(updateDoc)
    try {
        const res = await companyInfoCollection.updateOne(
            { 'contactInformation.email': params.email },
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


export const dynamic = 'force-dynamic';