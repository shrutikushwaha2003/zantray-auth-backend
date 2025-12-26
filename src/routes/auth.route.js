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

import { body, validationResult } from "express-validator";

const router = express.Router();

/* ===== VALIDATION HANDLER ===== */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};

/* ===== LOGIN ===== */
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required"),
  ],
  validate,
  login
);

/* ===== SIGNUP ===== */
router.post(
  "/signup",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  validate,
  signup
);

/* ===== PROFILE ===== */
router.get("/profile", authMiddleware, getProfile);

/* ===== FORGOT PASSWORD ===== */
router.post(
  "/forgot-password",
  [body("email").isEmail()],
  validate,
  forgotPassword
);

/* ===== VERIFY OTP ===== */
router.post(
  "/verify-otp",
  [
    body("email").isEmail(),
    body("otp").isLength({ min: 6, max: 6 }),
  ],
  validate,
  verifyOtp
);

/* ===== RESET PASSWORD ===== */
router.post(
  "/reset-password",
  [body("password").isLength({ min: 6 })],
  validate,
  resetPassword
);

export default router;
