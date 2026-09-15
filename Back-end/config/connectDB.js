import mongoose from "mongoose";
import productModel from "../data/models/Product.js";

const connectDB  = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        await productModel.updateMany(
            { status: { $exists: false } },
            [
                {
                    $set: {
                        status: {
                            $cond: [
                                { $eq: ["$isActive", "out of stock"] },
                                "out of stock",
                                { $cond: [{ $eq: ["$isApproved", true] }, "approved", "pending"] }
                            ]
                        },
                        isActive: {
                            $cond: [
                                { $in: ["$isActive", ["Active", "active", true]] },
                                true,
                                false
                            ]
                        }
                    }
                },
                { $unset: "isApproved" }
            ],
            { updatePipeline: true }
        );
        console.log("Database connected")
    }catch(error){
        console.error(`Error from connect db ${error}`)
        throw error
    }
}


export default connectDB