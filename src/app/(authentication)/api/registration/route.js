import { connectDB } from "@/lib/connectDB";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const newUser = await request.json();
  
  try {
    const db = await connectDB();
    const userCollection = db.collection("users");

    // Check if the user exists
    const exist = await userCollection.findOne({ email: newUser.email });
    console.log("Existing User:", exist); // Debugging info

    if (exist) {
      // Return 409 Conflict when user already exists
      return NextResponse.json({ message: "User Exists" }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(newUser.password, 14);

    // Insert the new user with the hashed password
    const res = await userCollection.insertOne({
      ...newUser,
      password: hashedPassword,
    });

    // User creation success
    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error while creating user:", error);

    // Return error response with status 500
    return NextResponse.json(
      { message: "Something Went Wrong", error: error.message },
      { status: 500 }
    );
  }
};
