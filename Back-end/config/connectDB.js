import mongoose from "mongoose";
import productModel from "../data/models/Product.js";

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return;
        }

        await mongoose.connect(process.env.MONGO_URL);

        console.log("Database connected");

    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
        throw error;
    }
};

export default connectDB;