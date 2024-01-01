// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb";

if (!process.env.MONGO_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGO_URI"');
}

const mongoclient = new MongoClient(process.env.MONGO_URI);
const mongoClientPromise = mongoclient.connect();

const testingDB = (await mongoClientPromise).db("testing");
export const todosCol = testingDB.collection("todos");
export const usersCol = testingDB.collection("users");

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default mongoClientPromise;
