import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../utils/emails.js";


/* ========= SIGNUP ========= */
const signup = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw "All fields are required";
  }

  const userExist = await User.findOne({ email });
  if (userExist) throw "User already exists";

  const hash = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hash,
  });
};

/* ========= LOGIN ========= */
const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw "Invalid credentials";

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw "Invalid credentials";

  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/* ========= FORGOT PASSWORD ========= */
const forgotPassword = async ({ email }) => {
  if (!email) throw "Email required";

  const user = await User.findOne({ email });
  if (!user) throw "User not found";

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.forgotOtp = otp;
  user.forgotOtpExpiry = Date.now() + 10 * 60 * 1000;
  await user.save();

  await sendOtpEmail(user.email, otp);

  return {
    message: "OTP sent to your email",
  };
};


/* ========= VERIFY OTP ========= */
const verifyOtp = async ({ email, otp }) => {
  const user = await User.findOne({ email });
  if (!user) throw "User not found";

  if (
    user.forgotOtp !== otp ||
    user.forgotOtpExpiry < Date.now()
  ) {
    throw "Invalid or expired OTP";
  }

  const resetToken = jwt.sign(
    { id: user._id },
    process.env.FORGOT_PASSWORD_SECRET,
    { expiresIn: "10m" }
  );

  user.forgotOtp = null;
  user.forgotOtpExpiry = null;
  await user.save();

  return resetToken;
};

/* ========= RESET PASSWORD ========= */
const resetPassword = async ({ token, password }) => {
  const decoded = jwt.verify(
    token,
    process.env.FORGOT_PASSWORD_SECRET
  );

  const user = await User.findById(decoded.id);
  if (!user) throw "User not found";

  const hash = await bcrypt.hash(password, 10);
  user.password = hash;
  await user.save();

  return "Password reset successful";
};

export default {
  signup,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
