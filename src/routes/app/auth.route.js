import express from "express";
import * as c from "../../controllers/app/auth.controllers.js";
import auth from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validation.middleware.js";
import * as v from "../../validation/auth.validation.js";

const router = express.Router();

router.post("/signup", v.signupValidation, validate, c.signup);
router.post("/login", v.loginValidation, validate, c.login);
router.get("/profile", auth, c.getProfile);
router.post("/forgot-password", v.forgotPasswordValidation, validate, c.forgotPassword);
router.post("/verify-otp", v.verifyOtpValidation, validate, c.verifyOtp);
router.post("/reset-password", v.resetPasswordValidation, validate, c.resetPassword);
router.delete("/delete-profile", v.deleteByEmailValidation, validate, auth, c.deleteProfileController);
export default router;
