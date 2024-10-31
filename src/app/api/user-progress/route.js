import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { startOfDay, subDays, format } from "date-fns"; // Assuming date-fns is installed

export const GET = async (request) => {
  const db = await connectDB();

  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  try {
    // Fetch user-specific data from multiple collections
    const [applyedJobsCollection, seekerInfoCollection] = await Promise.all([
      db
        .collection("applyedJobs")
        .find({ "applicantInfo.contactInformation.email": email })
        .toArray(),
      db
        .collection("seekerInfo")
        .findOne({ "contactInformation.email": email }),
    ]);
    

    // Logic for calculating profile completion (assuming fields weights)
    const profileFields = [
      "contactInformation",
      "profileOverview",
      "careerObjective",
      "projects",
      "skills",
      "education",
      "workExperience",
    ];
    const completedFields = profileFields.filter(
      (field) => seekerInfoCollection && seekerInfoCollection[field]
    );
    const profileCompletion = Math.floor(
      (completedFields.length / profileFields.length) * 100
    );

    // Calculate applications per day for the last month
    const today = startOfDay(new Date());
    const applicationsData = Array.from({ length: 30 }, (_, index) => {
      const date = subDays(today, index);
      const formattedDate = format(date, "yyyy-MM-dd");
      const applicationsCount = applyedJobsCollection.filter(
        (job) =>
          format(new Date(job.applicationDate), "yyyy-MM-dd") === formattedDate
      ).length;
      return { date: formattedDate, applications: applicationsCount };
    }).reverse(); // Reverse to display oldest to newest

    const acc = {
      Pending: 0,
      Task: 0,
      Interview: 0,
      Submitted: 0,
      Selected: 0,
      Rejected: 0,
    };

    // Count applications per status
    const jobStatusCounts = applyedJobsCollection.reduce((_, job) => {
      acc[job.jobStatus] = (acc[job.jobStatus] || 0) + 1;
      return acc;
    }, {});

    // Calculate growth logic for different states
    const calculateProgress = () => {
      let progress = 0;
      const weights = {
        Pending: 0.1,
        Task: 0.3,
        Interview: 0.4,
        Submitted: 0.5,
        Selected: 0.8,
        Rejected: -0.2,
      };
      applyedJobsCollection.forEach((job) => {
        const weight = weights[job.jobStatus] || 0;
        progress += weight;
      });
      const progressState =
        progress > 0.75 ? "growth" : progress < 0.5 ? "decline" : "neutral";
      return { progress, progressState };
    };

    // console.log(calculateProgress())
    // Prepare response data
    return NextResponse.json({
      profileCompletion,
      jobStatusCounts,
      progressTrend: calculateProgress(),
      applicationsData
    });
  } catch (error) {
    console.error("Error fetching user progress data:", error);
    return NextResponse.json({
      message: "Error fetching user progress",
      error,
    });
  }
};

