import * as service from "../../services/admin/auth.service.js";
import { successResponse, errorResponse } from "../../utils/response.utils.js";

/* ================= ADMIN SIGNUP ================= */
export const signup = async (req, res) => {
  try {
    await service.signup(req.body);

    successResponse(res, {
      message: "Admin signup successful. OTP has been sent to email.",
    });
  } catch (err) {
    errorResponse(res, err);
  }
};

/* ================= VERIFY OTP (SIGNUP / FORGOT) ================= */
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

/* ================= ADMIN LOGIN ================= */
export const login = async (req, res) => {
  try {
    const token = await service.login(req.body);

    successResponse(res, {
      message: "Admin login successful",
      data: { token },
    });
  } catch (err) {
    errorResponse(res, err);
  }
};

/* ================= FORGOT PASSWORD ================= */
export const forgotPassword = async (req, res) => {
  try {
    await service.forgotPassword(req.body);

    successResponse(res, {
      message: "OTP sent for password reset",
    });
  } catch (err) {
    errorResponse(res, err);
  }
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req, res) => {
  try {
    await service.resetPassword(req.body);

    successResponse(res, {
      message: "Password reset successful",
    });
  } catch (err) {
    errorResponse(res, err);
  }
};

/* ================= DELETE ADMIN PROFILE ================= */
export const deleteProfile = async (req, res) => {
  try {
    await service.deleteProfile(req.body);

    successResponse(res, {
      message: "Admin profile deleted successfully",
    });
  } catch (err) {
    errorResponse(res, err);
  }
};
