import { MongoClient } from "mongodb";

let db;

export const connectDB = async () => {
  if (db) return db;
  try {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    db = client.db('JobSphereDB');
    return db;
  } catch (error) {
    console.log(error);
  }
};
