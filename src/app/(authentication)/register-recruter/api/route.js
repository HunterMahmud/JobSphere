import { connectDB } from "@/lib/connectDB";

export const POST = async (request) => {
  const newRecruter = await request.json();
  const { email } = newRecruter;
  try {
    const db = await connectDB();
    const userCollection = db.collection("recruter");
    const isExists = await userCollection.findOne({ email });
    if (isExists) {
      return Response.json({ message: "recruter already exists" }, { status: 409 });
    }
    const res = await userCollection.insertOne(newRecruter);
    return Response.json({ message: "recruter account created" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "something went wrong", error }, { status: 500 });
  }
};
