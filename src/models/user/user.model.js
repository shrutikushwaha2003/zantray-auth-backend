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

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date }
  },
  

  { timestamps: true ,
    collection: "users"

  },
);

export default mongoose.model("User", userSchema);
