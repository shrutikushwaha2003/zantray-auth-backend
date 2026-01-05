import express from "express";
import * as controller from "../../controllers/admin/auth.controllers.js";
import validate from "../../middleware/validation.middleware.js";
import auth from "../../middleware/auth.middleware.js";
import * as v from "../../validation/auth.validation.js";

const router = express.Router();

router.post("/signup", v.signupValidation, validate, controller.signup);
router.post("/verify-signup-otp", v.verifyOtpValidation, validate, controller.verifyOtp);
router.post("/login", v.loginValidation, validate, controller.login);

router.get("/profile", auth(), controller.getProfile);

router.post("/forgot-password", v.forgotPasswordValidation, validate, controller.forgotPassword);
router.post("/verify-forgot-otp", v.verifyOtpValidation, validate, controller.verifyForgotOtp);
router.post("/reset-password", v.resetPasswordValidation, validate, controller.resetPassword);

router.delete("/delete-profile", auth("admin"), v.deleteByEmailValidation, validate, controller.deleteProfile);

export default router;
