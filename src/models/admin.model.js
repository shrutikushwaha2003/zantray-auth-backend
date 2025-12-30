import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted:{
        type:Boolean,
        default: false,
    },
    lastLogin: Date,
    
  },
  {
    timestamps: true,
    collection: "admins",
  }
);

export default mongoose.model("Admin", adminSchema);
