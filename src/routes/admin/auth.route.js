import express from "express";
import * as c from "../../controllers/admin/auth.controllers.js";
import validate from "../../middleware/validation.middleware.js";
import auth from "../../middleware/auth.middleware.js";
import * as v from "../../validation/auth.validation.js";

const router = express.Router();

router.post("/signup", v.signupValidation, validate, c.signup);
router.post("/login", v.loginValidation, validate, c.login);
router.post("/forgot-password", v.forgotPasswordValidation, validate, c.forgotPassword);
router.post("/verify-otp", v.verifyOtpValidation, validate, c.verifyOtp);
router.post("/reset-password", v.resetPasswordValidation, validate, c.resetPassword);

/* Protected */
router.delete(
  "/delete-profile",
  auth,
  v.deleteByEmailValidation,
  validate,
  c.deleteProfile
);

export default router;
