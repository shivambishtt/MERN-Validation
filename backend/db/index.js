import mongoose from "mongoose";
const DB_NAME = "MERNAuth";

const connectDB = async () => {
  try {
    const conenctionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `Mongo DB connected !! DB Host: ${conenctionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`Mongo DB connection error`, error);
    process.exit(1);
  }
};
export default connectDB;
