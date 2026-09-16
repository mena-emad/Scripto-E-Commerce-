import dotenv from "dotenv";
dotenv.config();


import app from "./app.js";
import connectDB from "./config/connectDB.js";
const port = process.env.PORT || 3000;
const startServer = async ()=>{
    await connectDB()
    try{
        console.log("Index.js Running")
        app.listen(port, () => console.log(`Server running on port ${port}`));
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}

startServer()

export default app;