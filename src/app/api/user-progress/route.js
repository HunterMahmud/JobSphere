import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const db = await connectDB();
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  try {
    // Fetch user-specific data from multiple collections
    const [applyedJobsCollection, seekerInfoCollection, jobsCollection] = await Promise.all([
      db.collection("applyedJobs").find({ "applicantInfo.contactInformation.email": email }).toArray(),
      db.collection("seekerInfo").findOne({ "contactInformation.email": email }),
      db.collection("jobs").find({}).toArray()
    ]);

    // Logic for calculating profile completion (assuming fields weights)
    const profileFields = ['contactInformation', 'profileOverview', 'careerObjective', 'projects', 'skills', 'education', 'workExperience'];
    const completedFields = profileFields.filter(field => seekerInfoCollection && seekerInfoCollection[field]);
    const profileCompletion = Math.floor((completedFields.length / profileFields.length) * 100);

    // Count applications per status
    const jobStatusCounts = applyedJobsCollection.reduce((acc, job) => {
      acc[job.jobStatus] = (acc[job.jobStatus] || 0) + 1;
      return acc;
    }, {});

    // Calculate growth logic for different states
    const calculateProgress = () => {
      let progress = 0;
      const weights = { "Pending": 0.1, "Tasked": 0.3, "Interviewed": 0.4, "Selected": 0.8, "Rejected": -0.2 };
      applyedJobsCollection.forEach(job => {
        const weight = weights[job.jobStatus] || 0;
        progress += weight;
      });
      return progress > 0.5 ? 'growth' : progress < 0 ? 'decline' : 'neutral';
    };

    // Prepare response data
    return NextResponse.json({
      profileCompletion,
      jobStatusCounts,
      progressTrend: calculateProgress()
    });
  } catch (error) {
    console.error("Error fetching user progress data:", error);
    return NextResponse.json({ message: "Error fetching user progress", error });
  }
};
