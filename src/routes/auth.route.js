import express from "express";
import {
  signup,
  login,
  getProfile,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../controllers/auth.controllers.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;
