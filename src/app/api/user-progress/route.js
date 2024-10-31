import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { startOfDay, subDays, format, eachWeekOfInterval } from "date-fns";

export const GET = async (request) => {
  const db = await connectDB();

  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const progressView = searchParams.get("progressView") || "daily";
  const applicationsView = searchParams.get("applicationsView") || "daily";

  try {
    // Fetch user-specific data
    const [applyedJobsCollection, seekerInfoCollection, savedJobsCount] =
      await Promise.all([
        db
          .collection("applyedJobs")
          .find({ "applicantInfo.contactInformation.email": email })
          .toArray(),
        db
          .collection("seekerInfo")
          .findOne({ "contactInformation.email": email }),
          db.collection("saveJobs").countDocuments({ "user.email": email }),
      ]);

    // Profile completion logic
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

    // Define weights for job statuses
    const weights = {
      Pending: 0.1,
      Task: 0.3,
      Interview: 0.4,
      Submitted: 0.5,
      Selected: 0.8,
      Rejected: -0.2,
    };

    // Calculate growth logic for different states
    const calculateTotalPoints = () => {
      let points = 0;

      applyedJobsCollection.forEach((job) => {
        const weight = weights[job.jobStatus] || 0;
        points += weight;
      });

      return points;
    };

    // Calculate daily progress points for the last 30 days
    const today = startOfDay(new Date());
    const dailyProgressData = Array.from({ length: 30 }, (_, index) => {
      const date = subDays(today, index);
      const formattedDate = format(date, "yyyy-MM-dd");

      // Calculate points for each day
      const dailyPoints = applyedJobsCollection.reduce((total, job) => {
        const jobDate = format(new Date(job.applicationDate), "yyyy-MM-dd");
        const weight = weights[job.jobStatus] || 0;
        return jobDate === formattedDate ? total + weight : total;
      }, 0);

      return { date: formattedDate, points: dailyPoints };
    }).reverse();

    // Aggregate progress data if 'weekly' view is selected
    const progressData =
      progressView === "weekly"
        ? eachWeekOfInterval({ start: subDays(today, 29), end: today }).map(
            (weekStart) => {
              const weekPoints = dailyProgressData.reduce((total, day) => {
                return day.date >= format(weekStart, "yyyy-MM-dd") &&
                  day.date <= format(subDays(weekStart, -6), "yyyy-MM-dd")
                  ? total + day.points
                  : total;
              }, 0);
              return {
                date: format(weekStart, "yyyy-MM-dd"),
                points: weekPoints,
              };
            }
          )
        : dailyProgressData;

    // Calculate daily applications data for the last 30 days
    const dailyApplicationsData = dailyProgressData.map(({ date }) => ({
      date,
      applications: applyedJobsCollection.filter(
        (job) => format(new Date(job.applicationDate), "yyyy-MM-dd") === date
      ).length,
    }));

    // Aggregate applications data if 'weekly' view is selected
    const applicationsData =
      applicationsView === "weekly"
        ? eachWeekOfInterval({ start: subDays(today, 29), end: today }).map(
            (weekStart) => {
              const weekApplications = dailyApplicationsData.reduce(
                (total, day) => {
                  return day.date >= format(weekStart, "yyyy-MM-dd") &&
                    day.date <= format(subDays(weekStart, -6), "yyyy-MM-dd")
                    ? total + day.applications
                    : total;
                },
                0
              );
              return {
                date: format(weekStart, "yyyy-MM-dd"),
                applications: weekApplications,
              };
            }
          )
        : dailyApplicationsData;

    return NextResponse.json({
      profileCompletion,
      jobStatusCounts: Object.keys(weights).reduce(
        (acc, status) => ({
          ...acc,
          [status]: applyedJobsCollection.filter(
            (job) => job.jobStatus === status
          ).length,
        }),
        {}
      ),
      progressData,
      totalPoints: calculateTotalPoints(),
      applicationsData,
      savedJobsCount
    });
  } catch (error) {
    console.error("Error fetching user progress data:", error);
    return NextResponse.json({
      message: "Error fetching user progress",
      error,
    });
  }
};
