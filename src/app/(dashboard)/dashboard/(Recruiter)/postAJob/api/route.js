import { connectDB } from "@/lib/connectDB";

export const POST = async (request) => {
  const newJobs = await request.json();
  console.log(newJobs);
  const db = await connectDB();
  const postAJobCollection = db.collection("addedJobs");
  const companyCollection = db.collection("companyInfo");

  try {
    const result = await companyCollection.findOne({'contactInformation.email':newJobs?.email})
    console.log(result);
    const res = await postAJobCollection.insertOne({...newJobs, compnayInforamtion: result});
    return Response.json({ message: "job posted successfully",res }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Something Went Wrong" }, { status: 400 });
  }
};
