import mongoose from "mongoose";
import productModel from "../data/models/Product.js";

const connectDB  = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        
        console.log("Database connected")
    }catch(error){
        console.error(`Error from connect db ${error}`)
        throw error
    }
}


export default connectDB