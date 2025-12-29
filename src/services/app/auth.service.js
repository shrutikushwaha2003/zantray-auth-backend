import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CustomError from "../../utils/CustomError.js";

/* SIGNUP */
import { sendOtpEmail } from "../../utils/emails.js";

export const signup = async ({ name, email, password }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new CustomError("User already exists", 400);

  const hash = await bcrypt.hash(password, 10);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await User.create({
    name,
    email,
    password: hash,
    forgotOtp: otp,
    forgotOtpExpiry: Date.now() + 10 * 60 * 1000,
    isVerified: false,
    isActive: true,
    isDeleted: false,
  });

  
  await sendOtpEmail(email, otp);

  return true;
};


/* LOGIN */
export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new CustomError("User not found", 404);


  if (!user.isVerified) {
    throw new CustomError("Please verify OTP before login", 403);
  }


  if (user.isDeleted || !user.isActive) {
    throw new CustomError("Account is inactive", 403);
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new CustomError("Invalid credentials", 401);

  user.lastLogin = new Date();
  await user.save();

  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* FORGOT PASSWORD */
export const forgotPassword = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) throw new CustomError("User not found", 404);

  user.forgotOtp = Math.floor(100000 + Math.random() * 900000).toString();
  user.forgotOtpExpiry = Date.now() + 10 * 60 * 1000;
  await user.save();
};

/* VERIFY OTP (COMMON) */
export const verifyOtpCommon = async ({ email, otp }) => {
  const user = await User.findOne({ email });
  if (!user) throw new CustomError("User not found", 404);

  if (user.forgotOtp !== otp || user.forgotOtpExpiry < Date.now()) {
    throw new CustomError("Invalid or expired OTP", 400);
  }

  user.isVerified = true;
  user.forgotOtp = null;
  user.forgotOtpExpiry = null;
  await user.save();
};

/* RESET PASSWORD */
export const resetPassword = async ({ token, password }) => {
  const decoded = jwt.verify(token, process.env.FORGOT_PASSWORD_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) throw new CustomError("User not found", 404);

  user.password = await bcrypt.hash(password, 10);
  await user.save();
};


/* DELETE PROFILE */

export const deleteProfile = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("User not found", 404);
  }

  user.isDeleted = true;
  user.isActive = false;

  await user.save();
};

