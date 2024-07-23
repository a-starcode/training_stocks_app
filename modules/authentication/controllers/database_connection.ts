import mongoose from "mongoose";

let cachedConnection: typeof mongoose | null = null;

async function connectToDatabase(): Promise<typeof mongoose | null> {
  if (cachedConnection) {
    return cachedConnection;
  } else {
    try {
      const client = await mongoose?.connect(process.env.MONGODB_URL as string, {
        serverSelectionTimeoutMS: 15 * 1000,
      });

      if (client?.connection?.readyState == 1) {
        cachedConnection = client;
      }
    } catch (error) {
      console.error("Error connecting to database:", error);
      throw error;
    }
  }

  return cachedConnection;
}

export default connectToDatabase;
