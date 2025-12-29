import { body } from "express-validator";

export const signupValidation = [
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
];

export const loginValidation = [
  body("email").isEmail(),
  body("password").notEmpty(),
];

export const forgotPasswordValidation = [
  body("email").isEmail(),
];

export const verifyOtpValidation = [
  body("email").isEmail(),
  body("otp").notEmpty(),
];

export const resetPasswordValidation = [
  body("token").notEmpty(),
  body("password").isLength({ min: 6 }),
];

export const deleteByEmailValidation = [
  body("email").isEmail(),
];
