import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const addedJobsCollection = db.collection("addedJobs");
  try {
    const resp = await addedJobsCollection.deleteOne({
      _id: new ObjectId(params.id),
    });
    return NextResponse.json({ message: "deleted the job", response: resp });
  } catch (error) {
    return NextResponse.json({ message: "Something Went Wrong" });
  }
};


export const PUT = async (request, { params }) => {
    console.log(params.id)
  const db = await connectDB();
  const addedJobsCollection = db.collection("addedJobs");
  const updateDoc = await request.json();
  console.log(updateDoc)
  try {
    const resp = await addedJobsCollection.updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          ...updateDoc
        },
      },
      {
        upsert : true
      }
    );
    console.log(resp)
    return NextResponse.json({ message: "updated the job", response: resp });
  } catch (error) {
    return NextResponse.json({ message: "Something Went Wrong" });
  }
};


// export const PUT = async (request, { params }) => {
//   const db = await connectDB();
//   const addedJobsCollection = db.collection("addedJobs");


//   let updateDoc;
//   try {
//     updateDoc = await request.json();
//     console.log(udpadeDoc)
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Invalid request body", error: error.message },
//       { status: 400 }
//     );
//   }


//   // Validate params.id
//   if (!ObjectId.isValid(params.id)) {
//     return NextResponse.json({ message: "Invalid job ID" }, { status: 400 });
//   }


//   try {
//     const resp = await addedJobsCollection.updateOne(
//       { _id: new ObjectId(params.id) },
//       {
//         $set: {
//           ...updateDoc,
//         },
//       },
//       {
//         upsert: true, // Ensure you are not accidentally creating a new document if the ID does not exist
//       }
//     );
// console.log(resp)
//     if (resp.matchedCount === 0) {
//       return NextResponse.json(
//         { message: "Job not found", response: resp },
//         { status: 404 }
//       );
//     }


//     return NextResponse.json({
//       message: "Job updated successfully",
//       response: resp,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Something Went Wrong", error: error.message },
//       { status: 500 }
//     );
//   }
// };


export const GET = async (request, { params }) => {
  const db = await connectDB();
  const addedJobsCollection = db.collection("addedJobs");
  try {
    const resp = await addedJobsCollection.findOne({
      _id: new ObjectId(params.id),
    });
    return NextResponse.json({ message: "job found", data: resp });
  } catch (error) {
    return NextResponse.json({ message: "Something Went Wrong" });
  }
};



