import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: { type: String, required: true },

    //  Login OTP (2FA)
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Number,
    },

    // Forgot password OTP
    forgotOtp: {
      type: String,
    },
    forgotOtpExpiry: {
      type: Number,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    // Forgot password OTP

    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
      updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
      createdOn: { type: Date, default: Date.now },
      updatedOn: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
