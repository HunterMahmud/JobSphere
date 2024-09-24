import { connectDB } from "@/lib/connectDB";

export const POST = async (request) => {
  const newUser = await request.json();
  const { email } = newUser;
  try {
    const db = await connectDB();
    const userCollection = db.collection("users");
    const isExists = await userCollection.findOne({ email });
    if (isExists) {
      return Response.json({ message: "user already exists" }, { status: 304 });
    }
    const res = await userCollection.insertOne(newUser);
    return Response.json({ message: "New user created" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "something went wrong", error }, { status: 500 });
  }
};
