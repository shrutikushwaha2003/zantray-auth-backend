import mongoose from "mongoose";

const aboutHeroSchema = new mongoose.Schema({
  label: String,
  title: String,
  description: String,
  image: String,

  primaryButtonText: String,
  primaryButtonUrl: String,
  secondaryButtonText: String,
  secondaryButtonUrl: String,

  sinceYear: Number,

  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
}, { timestamps: true });

export default mongoose.model("AboutHero", aboutHeroSchema);
