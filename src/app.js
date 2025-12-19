import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "../src/routes/auth.route.js";


connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

export default app;
