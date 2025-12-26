import authService from "../services/auth.service.js";
import User from "../models/user.model.js";
import logger from "../utils/logger.js";

/* SIGNUP */
export const signup = async (req, res) => {
  try {
    await authService.signup(req.body);
    logger.info("Signup successful", { email: req.body.email });
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    logger.error("Signup failed", err);
    res.status(400).json({ message: err });
  }
};

/* LOGIN */
export const login = async (req, res) => {
  try {
    const token = await authService.login(req.body);
    logger.info("Login successful", { email: req.body.email });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    logger.error("Login failed", err);
    res.status(400).json({ message: err });
  }
};

/* PROFILE */
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "-password -forgotOtp -forgotOtpExpiry"
  );
  res.json(user);
};

/* FORGOT PASSWORD */
export const forgotPassword = async (req, res) => {
  try {
    const result = await authService.forgotPassword(req.body);
    logger.info("OTP sent", { email: req.body.email });
    res.json(result);
  } catch (err) {
    logger.error("Forgot password failed", err);
    res.status(400).json({ message: err });
  }
};

/* VERIFY OTP */
export const verifyOtp = async (req, res) => {
  try {
    const resetToken = await authService.verifyOtp(req.body);
    res.json({ resetToken });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

/* RESET PASSWORD */
export const resetPassword = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const message = await authService.resetPassword({
      token,
      password: req.body.password,
    });
    res.json({ message });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
