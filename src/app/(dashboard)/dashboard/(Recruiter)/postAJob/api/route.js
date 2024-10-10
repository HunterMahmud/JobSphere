import { connectDB } from "@/lib/connectDB";


export const POST = async (request) => {
  const newJobs = await request.json();
  const db = await connectDB();
  const postAJobCollection = db.collection("addedJobs");

  try {
    const res = await postAJobCollection.insertOne(newJobs);
    return Response.json({ message: "job posted successfully",res }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Something Went Wrong" }, { status: 400 });
  }
};


