import { body } from "express-validator";

/* ================= SIGNUP ================= */
export const signupValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain one number"),
];

/* ================= LOGIN ================= */
export const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

/* ================= FORGOT PASSWORD ================= */
export const forgotPasswordValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),
];

/* ================= VERIFY OTP ================= */
export const verifyOtpValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("otp")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 digits")
    .matches(/^[0-9]+$/)
    .withMessage("OTP must contain only numbers"),
];

/* ================= RESET PASSWORD ================= */
export const resetPasswordValidation = [
  body("token")
    .notEmpty()
    .withMessage("Reset token is required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain one number"),
];

/* ================= DELETE PROFILE ================= */
export const deleteByEmailValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),
];
