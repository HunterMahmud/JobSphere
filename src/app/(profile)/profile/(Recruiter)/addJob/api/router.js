import { connectDB } from "@/lib/connectDB";


export const POST = async (request) => {
  const newJobs = await request.json();
  const db = await connectDB();
  const addedJobsCollection = db.collection("addedJobs");


  try {
    const res = await addedJobsCollection.insertOne(newJobs);
    return Response.json({ message: "new-job added successfully",res }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Something Went Wrong" }, { status: 400 });
  }
};



