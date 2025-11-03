import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

export const connectToDB = async () => {
  try {
    await mongoose.connect(`${MONGO_URI}${MONGO_DB_NAME}`);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error(error);
    console.log("Database Connection Failed");
    process.exit(1);
  }
};
