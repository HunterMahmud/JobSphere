import { connectDB } from "@/lib/connectDB";

export const POST = async (request) => {
  const newPost = await request.json();

  const db = await connectDB();
  const blogsCollection = db.collection("blogs");

  try {
    // console.log(newPost)
    const res = await blogsCollection.insertOne(newPost);
    return Response.json({ message: "blog posted successfully",res }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Something Went Wrong" }, { status: 400 });
  }
};

