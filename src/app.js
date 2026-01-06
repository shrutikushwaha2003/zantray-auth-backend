import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/app/auth.route.js";
import adminAuthRoutes from "./routes/admin/auth/auth.route.js";

import errorHandler from "./middleware/error.middleware.js";
import requestLogger from "./middleware/request-logger.middleware.js";

dotenv.config();
connectDB();

const app = express();
app.set("trust proxy", true);

app.use(express.json());
app.use(requestLogger);

/* ===== USER ROUTES ===== */
app.use("/api/auth", authRoutes);

/* ===== ADMIN ROUTES ===== */
app.use("/api/admin/auth", adminAuthRoutes);

/* ===== ERROR HANDLER (LAST) ===== */
app.use(errorHandler);

export default app;
