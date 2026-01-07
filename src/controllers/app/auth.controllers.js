import * as service from "../../services/app/auth.service.js";
import { successResponse, errorResponse } from "../../utils/response.utils.js";
import User from "../../models/user/user.model.js";
import CustomError from "../../utils/CustomError.js";

export const signup = async (req, res) => {
  try {
    await service.signup(req.body);
    successResponse(res, { message: "Signup successful. Otp has been send in your email please verify your account" });
  } catch (e) {
    errorResponse(res, e);
  }
};

export const login = async (req, res) => {
  try {
    const token = await service.login(req.body);
    successResponse(res, { message: "Login successful", data: { token } });
  } catch (e) {
    errorResponse(res, e);
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) throw new CustomError("User not found", 404);

    successResponse(res, { message: "Profile fetched", data: user });
  } catch (e) {
    errorResponse(res, e);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    await service.forgotPassword(req.body);
    successResponse(res, { message: "OTP sent" });
  } catch (e) {
    errorResponse(res, e);
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const resetToken = await service.verifyOtpCommon(req.body);

    successResponse(res, {
      message: "OTP verified successfully",
      ...(resetToken && { data: { resetToken } }),
    });
  } catch (err) {
    errorResponse(res, err);
  }
};

export const resetPassword = async (req, res) => {
  try {
    await service.resetPassword(req.body);
    successResponse(res, { message: "Password reset successful" });
  } catch (e) {
    errorResponse(res, e);
  }
};

export const deleteProfileController = async (req, res) => {
  try {
    await service.deleteProfile(req.body); 
    successResponse(res, {
      message: "Profile deleted successfully",
    });
  } catch (err) {
    errorResponse(res, err);
  }
};
