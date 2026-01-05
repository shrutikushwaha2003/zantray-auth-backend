import express from "express";
import * as authController from "../../controllers/admin/auth.controllers.js";
import validate from "../../middleware/validation.middleware.js";
import auth from "../../middleware/auth.middleware.js";
import * as authValidation from "../../validation/auth.validation.js";

const router = express.Router();

router.post("/signup", authValidation.signupValidation, validate, authController.signup);
router.post("/verify-signup-otp", authValidation.verifyOtpValidation, validate, authController.verifyOtp);
router.post("/login", authValidation.loginValidation, validate, authController.login);
router.post("/forgot-password", authValidation.forgotPasswordValidation, validate, authController.forgotPassword);
router.post("/verify-forgot-otp", authValidation.verifyOtpValidation, validate, authController.verifyForgotOtp);
router.post("/reset-password", authValidation.resetPasswordValidation, validate, authController.resetPassword);
router.get("/profile", auth("admin"), authController.getProfile);

export default router;
