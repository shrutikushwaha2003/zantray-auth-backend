import Admin from "../../models/admin.model.js";
import User from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CustomError from "../../utils/CustomError.js";
import { sendOtpEmail } from "../../utils/emails.js";

/* Admin signup */
export const signup = async ({ name, email, password }) => {
  const exists = await Admin.findOne({ email });
  if (exists) throw new CustomError("Admin already exists", 400);

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await Admin.create({
    name,
    email,
    password: hashedPassword,
    forgotOtp: otp,
    forgotOtpExpiry: Date.now() + 10 * 60 * 1000,
    isVerified: false,
    isActive: true,
    isDeleted: false,
  });

  await sendOtpEmail(email, otp);
  return true;
};

/* Verify signup OTP */
export const verifyOtpCommon = async ({ email, otp }) => {
  const admin = await Admin.findOne({ email });
  if (!admin) throw new CustomError("Admin not found", 404);

  if (
    !admin.forgotOtp ||
    String(admin.forgotOtp) !== String(otp) ||
    admin.forgotOtpExpiry < Date.now()
  ) {
    throw new CustomError("Invalid or expired OTP", 400);
  }

  admin.isVerified = true;
  admin.forgotOtp = null;
  admin.forgotOtpExpiry = null;
  await admin.save();

  return true;
};

/* Admin login */
export const login = async ({ email, password }) => {
  const admin = await Admin.findOne({ email });
  if (!admin) throw new CustomError("Admin not found", 404);

  if (!admin.isVerified)
    throw new CustomError("Please verify OTP before login", 403);

  if (!admin.isActive || admin.isDeleted)
    throw new CustomError("Account inactive", 403);

  const match = await bcrypt.compare(password, admin.password);
  if (!match) throw new CustomError("Invalid credentials", 401);

  admin.lastLogin = new Date();
  await admin.save();

  return jwt.sign(
    { id: admin._id, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/* Forgot password */
export const adminForgotPassword = async ({ email }) => {
  const admin = await Admin.findOne({ email });
  if (!admin) throw new CustomError("Admin not found", 404);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  admin.forgotOtp = otp;
  admin.forgotOtpExpiry = Date.now() + 10 * 60 * 1000;

  await admin.save();
  await sendOtpEmail(email, otp);

  return true;
};

/* Verify forgot password OTP */
export const verifyAdminForgotOtp = async ({ email, otp }) => {
  const admin = await Admin.findOne({ email });
  if (!admin) throw new CustomError("Admin not found", 404);

  if (
    !admin.forgotOtp ||
    String(admin.forgotOtp) !== String(otp) ||
    admin.forgotOtpExpiry < Date.now()
  ) {
    throw new CustomError("Invalid or expired OTP", 400);
  }

  const resetToken = jwt.sign(
    { id: admin._id },
    process.env.FORGOT_PASSWORD_SECRET,
    { expiresIn: "10m" }
  );

  admin.forgotOtp = null;
  admin.forgotOtpExpiry = null;
  await admin.save();

  return { resetToken };
};

/* Reset password */
export const adminResetPassword = async ({ token, password }) => {
  const decoded = jwt.verify(token, process.env.FORGOT_PASSWORD_SECRET);
  const admin = await Admin.findById(decoded.id);
  if (!admin) throw new CustomError("Admin not found", 404);

  admin.password = await bcrypt.hash(password, 10);
  await admin.save();

  return true;
};

/* Delete admin profile */
export const deleteAdminProfile = async ({ email }) => {
  const admin = await Admin.findOne({ email });
  if (!admin) throw new CustomError("Admin not found", 404);

  admin.isDeleted = true;
  admin.isActive = false;
  await admin.save();

  return true;
};
