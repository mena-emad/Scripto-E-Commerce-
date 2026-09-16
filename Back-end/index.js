import dotenv from "dotenv";
dotenv.config();


import app from "./app.js";
import connectDB from "./config/connectDB.js";
const port = process.env.PORT || 3000;
await connectDB()
const startServer = async ()=>{
    
    try{
        console.log("Index.js Running")
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}

startServer()

export default app;