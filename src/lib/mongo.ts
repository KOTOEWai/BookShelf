import { MongoClient } from "mongodb";

const uri = process.env.MongoUrl!;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MongoUrl) {
  throw new Error("Please add MONGODB_URI to .env");
}

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
