import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,

    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },

    forgotOtp: String,
    forgotOtpExpiry: Date,
    lastLogin: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
