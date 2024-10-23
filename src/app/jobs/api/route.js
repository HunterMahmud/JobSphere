import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const db = await connectDB();
  const jobsCollection = db.collection("jobs");

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const city = searchParams.get("city") || "";
  const skills = searchParams.get("skills") || ""; // Get skills from query parameters
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 6;
  const skip = (page - 1) * limit;

  try {
    const query = {};

    // Add job title filter if provided
    if (search) {
      query.jobTitle = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    // Add city filter if provided
    if (city) {
      query["compnayInforamtion.companyInfo.city"] = {
        $regex: city,
        $options: "i",
      };
    }

    // Handle skills filter: check if skills is a string or an array
    // if (skills) {
    //   let skillsArray;
    //   try {
    //     skillsArray = JSON.parse(skills); // Try to parse if it's a JSON string
    //     if (!Array.isArray(skillsArray)) {
    //       skillsArray = [skills]; // Treat as a single skill if it's not an array
    //     }
    //   } catch (error) {
    //     skillsArray = [skills]; // If it's a plain string, wrap it into an array
    //   }
    //   query.skills = { $in: skillsArray }; // Match any specified skills
    // }

    // Handle skills filter: check if skills is a string or an array
if (skills) {
  let skillsArray;
  try {
    skillsArray = JSON.parse(skills); // Try to parse if it's a JSON string
    if (!Array.isArray(skillsArray)) {
      skillsArray = [skills]; // Treat as a single skill if it's not an array
    }
  } catch (error) {
    skillsArray = [skills]; // If it's a plain string, wrap it into an array
  }

  query.$or = skillsArray.map((skill) => ({
    skills: skill // Directly match the skills field with the skill
  }));
  
}

    // Filter based on deadline (future jobs)
    query.$expr = {
      $gt: [
        { $dateFromString: { dateString: "$deadline" } }, // Convert deadline from string to Date
        new Date(), // Compare with today's date
      ],
    };

    const totalJobsCount = await jobsCollection.countDocuments(query);

    // Fetch jobs with pagination
    const jobs = await jobsCollection
      .find(query)
      .sort({ postedDate: -1 }) // Sort by posted date
      .skip(skip) // Pagination
      .limit(limit) // Pagination
      .toArray();

    console.log(jobs.length, totalJobsCount);

    // Fetch distinct cities
    const distinctCities = await jobsCollection
      .aggregate([
        {
          $match: {
            "compnayInforamtion.companyInfo.city": { $exists: true, $ne: "" },
          },
        },
        { $group: { _id: "$compnayInforamtion.companyInfo.city" } },
        { $project: { _id: 0, city: "$_id" } },
      ])
      .toArray();

    // // Fetch distinct skills
    // const distinctSkills = await jobsCollection.aggregate([
    //   { $match: { skills: { $exists: true, $ne: "" } } },
    //   { $group: { _id: "$skills" } },
    //   { $project: { _id: 0, skill: "$_id" } },
    // ]).toArray();

    // Fetch distinct skills (case insensitive)
    const distinctSkills = await jobsCollection
      .aggregate([
        { $unwind: "$skills" }, // Unwind the skills array
        { $match: { skills: { $exists: true, $ne: "" } } }, // Ensure skills exist and are not empty
        {
          $group: {
            _id: { $toUpper: "$skills" }, // Group by each individual skill in uppercase
            skill: { $first: "$skills" }, // Store the original skill name (optional)
          },
        },
        { $project: { _id: 0, skill: 1 } }, // Project to include only the skill field
      ])
      .toArray();

    return NextResponse.json({
      jobs: jobs,
      currentPage: page,
      totalPages: Math.ceil(totalJobsCount / limit), // Total pages based on filtered count
      cities: distinctCities,
      skills: distinctSkills, // Add skills to the response
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No Data Found", error });
  }
};

// import { connectDB } from "@/lib/connectDB";
// import { NextResponse } from "next/server";

// export const GET = async (request) => {
//   const db = await connectDB();
//   const jobsCollection = db.collection("jobs");

//   const { searchParams } = new URL(request.url);
//   const search = searchParams.get("search") || "";
//   const city = searchParams.get("city") || "";
//   const page = parseInt(searchParams.get("page")) || 1;
//   const limit = parseInt(searchParams.get("limit")) || 6;
//   const skip = (page - 1) * limit;

//   try {
//     const query = {};

//     // Add job title filter if provided
//     if (search) {
//       query.jobTitle = { $regex: search, $options: "i" }; // Case-insensitive search
//     }

//     // Add city filter if provided
//     if (city) {
//       query["compnayInforamtion.companyInfo.city"] = { $regex: city, $options: "i" };
//     }

//     query.$expr = {
//       $gte: [
//         { $dateFromString: { dateString: "$deadline" } }, // Convert deadline from string to Date
//         new Date() // Compare with today's date
//       ]
//     };

//     const totalJobsCount = await jobsCollection.countDocuments(query);

//     // Fetch jobs with pagination
//     const jobs = await jobsCollection
//       .find(query)
//       .sort({ postedDate: -1 }) // Sort by posted date
//       .skip(skip) // Pagination
//       .limit(limit) // Pagination
//       .toArray();

//     console.log(jobs.length, totalJobsCount)

//     const distinctCities = await jobsCollection.aggregate([
//       { $match: { "compnayInforamtion.companyInfo.city": { $exists: true, $ne: "" } } },
//       { $group: { _id: "$compnayInforamtion.companyInfo.city" } },
//       { $project: { _id: 0, city: "$_id" } },
//     ]).toArray();

//     return NextResponse.json({
//       jobs: jobs,
//       currentPage: page,
//       totalPages: Math.ceil(totalJobsCount / limit), // Total pages based on unfiltered count
//       cities: distinctCities,
//     });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ message: "No Data Found", error });
//   }
// };
