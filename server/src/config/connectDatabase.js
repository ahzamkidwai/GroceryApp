import mongoose from "mongoose";

export const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("Database Connection Successfull");
  } catch (error) {
    console.log("Database Connect Failed due to : ", error);
  }
};
