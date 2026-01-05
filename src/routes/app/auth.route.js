import express from "express";
import * as controller from "../../controllers/app/auth.controllers.js";
import auth from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validation.middleware.js";
import * as validation from "../../validation/auth.validation.js";

const router = express.Router();

router.post("/signup", validation.signupValidation, validate, controller.signup);
router.post("/login", validation.loginValidation, validate, controller.login);
router.get("/profile", auth(), controller.getProfile);
router.post("/forgot-password", validation.forgotPasswordValidation, validate, controller.forgotPassword);
router.post("/verify-otp", validation.verifyOtpValidation, validate, controller.verifyOtp);
router.post("/reset-password", validation.resetPasswordValidation, validate, controller.resetPassword);
router.delete("/delete-profile", validation.deleteByEmailValidation, validate, auth, controller.deleteProfileController);
export default router;
