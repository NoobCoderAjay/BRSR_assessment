import { connect } from "mongoose";
import config from "./index";
const connectDB = async (): Promise<void> => {
  try {
    await connect(config.mongoUri!);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
