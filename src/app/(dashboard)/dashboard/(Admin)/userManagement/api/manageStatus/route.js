export const PATCH = async (request, { params }) => {
    const db = await connectDB();
    const seekersCollection = db.collection("users");
    const recruitersCollection = db.collection("recruiter");
  
    const { email } = params; // Extract email from URL params
  
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }
  
    try {
      // Get the data to update from the request body
      const dataToUpdate = await request.json();
  
      // Try updating the user in both collections (seekers and recruiters)
      const updateSeekerResult = await seekersCollection.updateOne(
        { email },
        { $set: dataToUpdate }
      );
      const updateRecruiterResult = await recruitersCollection.updateOne(
        { email },
        { $set: dataToUpdate }
      );
  
      // Check if any document was updated
      if (updateSeekerResult.matchedCount === 0 && updateRecruiterResult.matchedCount === 0) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "User updated successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Failed to update user", error }, { status: 500 });
    }
  };
  