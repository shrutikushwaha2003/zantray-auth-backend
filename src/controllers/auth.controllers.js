import authService from "../services/auth.service.js";
import User from "../models/user.model.js";

/* SIGNUP */
export const signup = async (req, res) => {
  try {
    await authService.signup(req.body);
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

/* LOGIN */
export const login = async (req, res) => {
  try {
    const token = await authService.login(req.body);
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

/* PROFILE */
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

//* FORGOT PASSWORD */
export const forgotPassword = async (req, res) => {
  try {
    const message = await authService.forgotPassword(req.body);
    res.status(200).json({ success: true, message });
  } catch (err) {
    res.status(400).json({
      success: false,
      message:"Something went wrong",
    });
  }
};

/* VERIFY OTP */
export const verifyOtp = async (req, res) => {
  try {
    const resetToken = await authService.verifyOtp(req.body);
    res.status(200).json({ resetToken });
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
    res.status(200).json({ message });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
