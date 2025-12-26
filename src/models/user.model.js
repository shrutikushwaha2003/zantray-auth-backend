import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    userType: {
      type: String,
      enum: ["learner", "tutor"],
      default: "learner",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

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

    forgotOtp: String,
    forgotOtpExpiry: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
