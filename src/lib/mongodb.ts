import mongoose from "mongoose";

let connection: Promise<typeof mongoose> | null = null;

export function getMongo() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!connection) {
    connection = mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB ?? "ipoporwanda",
      bufferCommands: false,
    });
  }

  return connection;
}
