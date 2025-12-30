import Admin from "../../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CustomError from "../../utils/CustomError.js";
import { sendOtpEmail } from "../../utils/emails.js";

/* SIGNUP */
export const signup = async ({ name, email, password }) => {
  const exists = await Admin.findOne({ email });
  if (exists) throw new CustomError("Admin already exists", 400);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hash = await bcrypt.hash(password, 10);

  await Admin.create({
    name,
    email,
    password: hash,
    signupOtp: otp,
    signupOtpExpiry: Date.now() + 10 * 60 * 1000,
  });

  await sendOtpEmail(email, otp);
};

/* VERIFY SIGNUP OTP */
export const verifySignupOtp = async ({ email, otp }) => {
  const admin = await Admin.findOne({ email });
  if (!admin) throw new CustomError("Admin not found", 404);

  if (admin.signupOtp !== otp || admin.signupOtpExpiry < Date.now()) {
    throw new CustomError("Invalid or expired OTP", 400);
  }

  admin.isVerified = true;
  admin.signupOtp = null;
  admin.signupOtpExpiry = null;
  await admin.save();
};

/* LOGIN */
export const login = async ({ email, password }) => {
  const admin = await Admin.findOne({ email });
  if (!admin) throw new CustomError("Admin not found", 404);

  if (!admin.isVerified) throw new CustomError("Verify account first", 403);

  const match = await bcrypt.compare(password, admin.password);
  if (!match) throw new CustomError("Invalid credentials", 401);

  admin.lastLogin = new Date();
  await admin.save();

  return jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
