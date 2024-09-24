import { MongoClient, ServerApiVersion } from "mongodb";

let db;

export const connectDB = async () => {
  if (db) return db;
  try {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
    console.log(uri);
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    db = client.db("JobSphereDB");
    return db;
  } catch (error) {
    console.log(error);
  }
};


// import { MongoClient, ServerApiVersion } from "mongodb";

// let db;

// export const connectDB = async () => {
//   if (db) return db;
//   try {
//     const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
//     const client = new MongoClient(uri, {
//       serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//       },
//     });
//     db = client.db('JobSphereDB');
//     console.log("Connected to MongoDB");
//     return db;
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// };
