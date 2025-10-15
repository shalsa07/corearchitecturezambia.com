// Plain JavaScript MongoDB client with lazy, cached connection for Next.js App Router
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/test";

let _clientPromise = null;

export default function getClientPromise() {
  if (_clientPromise) return _clientPromise;
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    _clientPromise = global._mongoClientPromise;
  } else {
    const client = new MongoClient(uri);
    _clientPromise = client.connect();
  }
  return _clientPromise;
}

