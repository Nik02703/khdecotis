import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// We do NOT throw an error here. We allow graceful fallback if the URI is missing
// so the user's dev server doesn't crash before they supply credentials.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    console.warn("MONGODB_URI is not defined in the environment. Mongoose connection aborted. The application will fall back to local test data.");
    return null; // Signals to the consuming APIs to use graceful fallbacks
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("MongoDB connection established successfully.");
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("MongoDB Atlas connection failed: ", e.message);
    return null;
  }
  
  return cached.conn;
}

export default connectToDatabase;
