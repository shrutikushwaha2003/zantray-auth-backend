import * as service from "../../services/admin/auth.service.js";
import { successResponse, errorResponse } from "../../utils/response.utils.js";
import Admin from "../../models/admin.model.js";
import User from "../../models/user.model.js";
import CustomError from "../../utils/CustomError.js";

/* Signup */
export const signup = async (req, res) => {
  try {
    await service.signup(req.body);
    return successResponse(res, {
      message: "Signup successful. OTP sent to email.",
    });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* Verify signup OTP */
export const verifyOtp = async (req, res) => {
  try {
    await service.verifyOtpCommon(req.body);
    return successResponse(res, {
      message: "OTP verified successfully",
    });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* Login */
export const login = async (req, res) => {
  try {
    const token = await service.login(req.body);
    return successResponse(res, {
      message: "Login successful",
      data: { token },
    });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* Get profile (user or admin) */
export const getProfile = async (req, res) => {
  try {
    const { id, role } = req.user;
    let profile = null;

    if (role === "admin") {
      profile = await Admin.findById(id).select("-password");
    }

    if (role === "user") {
      profile = await User.findById(id).select("-password");
    }

    if (!profile) throw new CustomError("Profile not found", 404);

    return successResponse(res, {
      message: "Profile fetched",
      data: profile,
    });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* Forgot password */
export const forgotPassword = async (req, res) => {
  try {
    await service.adminForgotPassword(req.body);
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
    const { resetToken } = await service.verifyAdminForgotOtp(req.body);
    return successResponse(res, {
      message: "OTP verified",
      data: { resetToken },
    });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* Reset password */
export const resetPassword = async (req, res) => {
  try {
    await service.adminResetPassword(req.body);
    return successResponse(res, {
      message: "Password reset successful",
    });
  } catch (err) {
    return errorResponse(res, err);
  }
};

/* Delete profile */
export const deleteProfile = async (req, res) => {
  try {
    await service.deleteAdminProfile(req.body);
    return successResponse(res, {
      message: "Profile deleted successfully",
    });
  } catch (err) {
    return errorResponse(res, err);
  }
};
