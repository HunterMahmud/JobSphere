import { connectDB } from "@/lib/connectDB";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const newUser = await request.json();

  try {
    const db = await connectDB();
    //create two collection for user and recruiter
    const userCollection = db.collection("users");
    const recruiterCollection = db.collection("recruiter");

    //hashed the password
    const hashedPassword = bcrypt.hashSync(newUser?.password, 14);

    // check the user is registered as a job seeker or as a recruiter
    if (newUser?.role === "seeker") {
      //check the user is already exists or not
      const isExist = await userCollection.findOne({ email: newUser?.email });
      const isExistRecruiter = await recruiterCollection.findOne({ email: newUser?.email });
      if(isExistRecruiter){
        return NextResponse.json({message: 'User Exists as a recruiter'}, {status: 409})
      }

      if (isExist) {
        return NextResponse.json({ message: "User Exists" }, { status: 409 });
      }
      const res = await userCollection.insertOne({
        ...newUser,
        password: hashedPassword,
      });
    } else if (newUser?.role === "recruiter") {
      //check the recruiter is already exists or not
      const isExist = await recruiterCollection.findOne({email: newUser?.email});
      const isExistUser = await userCollection.findOne({ email: newUser?.email });
      if(isExistUser){
        return NextResponse.json({message: 'User Exists as a job seeker'}, {status: 409})
      }
      if (isExist) {
        return NextResponse.json({ message: "User Exists" }, { status: 409 });
      }
      const res = await recruiterCollection.insertOne({
        ...newUser,
        password: hashedPassword,
      });
    }

    return NextResponse.json({ message: "User Created" }, { status: 200 });
  } catch (error) {

    // console.error("Error while creating user:", error);

    return NextResponse.json(
      { message: "Something Went Wrong", error: error?.message },
      { status: 500 }
    );
  }
};
