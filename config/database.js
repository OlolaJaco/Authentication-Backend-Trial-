import mongoose from "mongoose";
import dotenv from "dotenv";

// configuring the dotenv file
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected Successfully");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDB;