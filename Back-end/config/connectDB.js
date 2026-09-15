import mongoose from "mongoose";

// Caching connection for Vercel Serverless environment
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Prevents 10s buffering timeout
    };

    cached.promise = mongoose.connect(process.env.MONGO_URL, opts).then((m) => {
      console.log("Database connected successfully");
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error(`Error connecting to DB: ${error.message}`);
    throw error;
  }

  return cached.conn;
};

export default connectDB;