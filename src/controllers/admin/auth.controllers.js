import * as authService from "../../services/admin/auth.service.js";
import { successResponse, errorResponse } from "../../utils/response.utils.js";
import Admin from "../../models/admin.model.js";

/* Admin signup */
export const signup = async (req, res) => {
  try {
    await authService.signup(req.body);
    return successResponse(res, {
      message: "Admin signup successful. OTP sent to email",
    });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* Verify signup OTP */
export const verifyOtp = async (req, res) => {
  try {
    await authService.verifyOtpCommon({
      ...req.body,
      purpose: "SIGNUP",
    });

    return successResponse(res, {
      message: "OTP verified successfully",
    });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* Admin login */
export const login = async (req, res) => {
  try {
    const token = await authService.login(req.body);
    return successResponse(res, {
      message: "Login successful",
      data: { token },
    });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* Forgot password */
export const forgotPassword = async (req, res) => {
  try {
    await authService.forgotPassword(req.body);
    return successResponse(res, {
      message: "OTP sent for password reset",
    });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* Verify forgot OTP */
export const verifyForgotOtp = async (req, res) => {
  try {
    const resetToken = await authService.verifyOtpCommon({
      ...req.body,
      purpose: "FORGOT_PASSWORD",
    });

    return successResponse(res, {
      message: "OTP verified successfully",
      data: { resetToken },
    });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* Reset password */
export const resetPassword = async (req, res) => {
  try {
    await authService.resetPassword(req.body);
    return successResponse(res, {
      message: "Password reset successful",
    });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* Admin profile */
export const getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    return successResponse(res, {
      data: admin,
    });
  } catch (err) {
    return errorResponse(res, err);
  }
};
