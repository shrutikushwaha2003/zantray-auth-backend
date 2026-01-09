import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true, // twitter, linkedin, instagram, youtube
  },
  url: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  }
}, { timestamps: true });

export default mongoose.model("SocialLink", socialLinkSchema);
