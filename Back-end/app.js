
// ==========================================
// 📦 Third-Party Packages & Security
// ==========================================
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import sanitize from "mongo-sanitize";

// ==========================================
// 🛣️ Internal Modules & Utils
// ==========================================
import authRouter from "./modules/auth/auth.routes.js";
import gerror from "./utils/gerror.js";

const app = express();

/**
||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||||||||||||||||||||||||||||||||
|        Global Security Middlewares       |
||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||||||||||||||||||||||||||||||||
**/

// ========= HTTP Headers Protection =========
app.use(helmet());

// ========= Cross-Origin Resource Sharing =========
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}));

/**
||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||||||||||||||||||||||||||||||||
|         Parsing & Sanitization           |
||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||||||||||||||||||||||||||||||||
**/

// ========= Cookie Parser =========
app.use(cookieParser());

// ========= Body Parser (JSON) =========
app.use(express.json({ limit: "50mb" }));

// ========= NoSQL Injection Protection =========
app.use((req,res,next)=>{
    if(req.body)   sanitize(req.body);
    if(req.query)  sanitize(req.query);
    if(req.params) sanitize(req.params);
    next();
});

/**
||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||||||||||||||||||||||||||||||||
|                API Routes                |
||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||||||||||||||||||||||||||||||||
**/

// ========= Authentication Routes =========
app.use("/", authRouter);

/**
||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||||||||||||||||||||||||||||||||
|           Global Error Handler           |
||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||||||||||||||||||||||||||||||||
**/

app.use(gerror);

export default app;